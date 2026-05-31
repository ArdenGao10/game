#!/usr/bin/env python3
# 用 numpy 合成一段【清晰可听、带和声进行】的循环氛围乐，输出 wav。
# 关键：音高放在 175~880Hz 中频区，笔记本喇叭也能放出来（之前 55Hz drone 听不到）。
# 不需要 ffmpeg/sox。用法： python3 generate_bgm.py
# 想冲「最佳音乐」奖时，用 Suno 出一条循环氛围乐覆盖 assets/audio/bgm.wav 即可。
import numpy as np, wave, pathlib

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "assets" / "audio" / "bgm.wav"
OUT.parent.mkdir(parents=True, exist_ok=True)

SR = 44100
BARS = 4            # 和弦数
BAR = 8.0          # 每个和弦时长(秒)
T = BARS * BAR     # 循环 32 秒
CF = 0.5           # 末尾交叉淡化长度(秒)，保证无缝
N = int(SR * T)
M = int(SR * (T + CF))     # 多渲染一截用于交叉淡化
t = np.arange(M) / SR

NOTE = {  # 频率表
    "A3": 220.00, "B3": 246.94, "C4": 261.63, "D4": 293.66, "E4": 329.63,
    "F4": 349.23, "G4": 392.00, "A4": 440.00, "B4": 493.88, "C5": 523.25,
    "D5": 587.33, "E5": 659.25, "F5": 698.46, "G5": 783.99, "A5": 880.00,
    "F3": 174.61, "G3": 196.00, "A2": 110.00, "F2": 174.61/2, "C3": 130.81, "G2": 98.00,
}

# 和弦进行 Am - F - C - G（i-VI-III-VII，忧伤里带点希望），每个 8 秒
PROG = [
    ("A2", ["A3", "C4", "E4"], ["A4", "C5", "E5", "C5"]),   # Am
    ("F2", ["F3", "A3", "C4"], ["F4", "A4", "C5", "A4"]),   # F
    ("C3", ["C4", "E4", "G4"], ["C5", "E5", "G5", "E5"]),   # C
    ("G2", ["G3", "B3", "D4"], ["G4", "B4", "D5", "B4"]),   # G
]

audio = np.zeros(M)

def soft_sine(freq, t):
    # 基音 + 轻微泛音，听感更暖
    return (np.sin(2*np.pi*freq*t)
            + 0.18*np.sin(2*np.pi*2*freq*t)
            + 0.06*np.sin(2*np.pi*3*freq*t))

# 1) 持续的和声 PAD：每个和弦淡入淡出，循环点也对齐
for i, (bass, pad, mel) in enumerate(PROG):
    c0, c1 = i*BAR, (i+1)*BAR
    # 钟形包络，跨小节平滑过渡（含 wrap：最后一节尾巴接回第一节）
    env = np.zeros(M)
    seg = (t >= c0) & (t < c1 + CF)
    local = (t[seg] - c0) / BAR
    env[seg] = np.sin(np.clip(local, 0, 1) * np.pi) ** 0.6
    chord = np.zeros(M)
    for nm in pad:
        chord += soft_sine(NOTE[nm], t)
    chord /= len(pad)
    audio += 0.32 * env * chord
    # 低音根音，给厚度（不指望喇叭放低频，但有总比没有好）
    audio += 0.16 * env * np.sin(2*np.pi*NOTE[bass]*t)

# 2) 旋律：音乐盒式拨奏，落在中高频，喇叭一定听得见
def pluck(freq, start, dur, amp):
    n0 = int(start*SR)
    n1 = min(M, n0 + int(dur*SR))
    if n0 >= M: return
    tt = (np.arange(n1-n0))/SR
    env = np.exp(-tt*4.2) * (1 - np.exp(-tt*400))   # 快起 + 指数衰减
    tone = np.sin(2*np.pi*freq*tt) + 0.25*np.sin(2*np.pi*2*freq*tt)
    audio[n0:n1] += amp * env * tone

step = 0.5  # 每 0.5 秒一个音
for i, (bass, pad, mel) in enumerate(PROG):
    for k in range(int(BAR/step)):
        start = i*BAR + k*step
        note = mel[k % len(mel)]
        # 句尾留白：每小节最后一拍不弹，留呼吸（也利于循环点干净）
        if k % len(mel) == len(mel)-1 and k >= int(BAR/step)-2:
            continue
        pluck(NOTE[note], start, 0.9, 0.22)

# 3) 一点点反馈延迟做空间感（向量化）
delay = int(0.27*SR)
echo = np.zeros(M)
echo[delay:] = audio[:-delay]
audio = audio + 0.28*echo

# 截到循环长度 + 交叉淡化让首尾无缝
body = audio
loop = body[:N].copy()
cf = int(CF*SR)
fade_in = np.sin(np.linspace(0, np.pi/2, cf))**2
fade_out = np.cos(np.linspace(0, np.pi/2, cf))**2
loop[:cf] = body[:cf]*fade_in + body[N:N+cf]*fade_out

# 归一化到 -2dB（游戏里 bgm.volume 再压一道）
peak = np.max(np.abs(loop)) + 1e-9
loop = loop / peak * 0.80

pcm16 = (np.clip(loop, -1, 1) * 32767).astype(np.int16)
with wave.open(str(OUT), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm16.tobytes())
print(f"完成：{OUT}  {T:.0f}s  {OUT.stat().st_size//1024} KB")
