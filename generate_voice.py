#!/usr/bin/env python3
# 从 game.js 抓取所有人物台词，按角色分配 edge-tts 音色，批量生成配音 mp3 + 清单。
# 用法： .ttsenv/bin/python generate_voice.py
import re, json, hashlib, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).parent
GAME_JS = ROOT / "game.js"
OUT_DIR = ROOT / "assets" / "audio" / "voice"
MANIFEST = OUT_DIR / "manifest.json"
EDGE = ROOT / ".ttsenv" / "bin" / "edge-tts"

# 角色 -> 音色（三个明显不同的中文嗓音）
VOICES = {
    "lead":      "zh-CN-YunjianNeural",   # 沈砚/队长：沉稳男声
    "tech":      "zh-CN-XiaoxiaoNeural",  # 林夏/技术员：女声
    "archivist": "zh-CN-YunxiNeural",     # 许弥/档案员：偏轻的男声
}
# 语速微调，让人物有差别
RATE = {"lead": "-6%", "tech": "+4%", "archivist": "-2%"}

text = GAME_JS.read_text(encoding="utf-8")
# 匹配 ["lead"|"tech"|"archivist", "台词"]
pattern = re.compile(r'\[\s*"(lead|tech|archivist)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]')
pairs = []
seen = set()
for role, line in pattern.findall(text):
    line = line.encode().decode("unicode_escape") if "\\" in line else line
    key = (role, line)
    if key in seen:
        continue
    seen.add(key)
    pairs.append((role, line))

print(f"找到 {len(pairs)} 条台词")
OUT_DIR.mkdir(parents=True, exist_ok=True)

manifest = {}
existing = {p.name for p in OUT_DIR.glob("*.mp3")}
made, skipped, failed = 0, 0, 0
for role, line in pairs:
    voice = VOICES[role]
    h = hashlib.md5(f"{voice}|{line}".encode("utf-8")).hexdigest()[:12]
    fname = f"{h}.mp3"
    manifest[line] = fname
    if fname in existing:
        skipped += 1
        continue
    try:
        subprocess.run(
            [str(EDGE), "--voice", voice, f"--rate={RATE[role]}",
             "--text", line, "--write-media", str(OUT_DIR / fname)],
            check=True, capture_output=True, timeout=60,
        )
        made += 1
        print(f"  ✓ [{role}] {line[:18]}…")
    except Exception as e:
        failed += 1
        print(f"  ✗ 失败 [{role}] {line[:18]}… {e}", file=sys.stderr)

MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"完成：新增 {made}，已存在 {skipped}，失败 {failed}。清单：{MANIFEST}")
