const order = ["entrance", "lobby", "hall", "admin"];

const state = {
  scene: "entrance",
  selected: null,
  inventory: [],
  flags: {
    plaque: false,
    cashierOpen: false,
    photoFound: false,
    passwordKnown: false,
    lockerOpen: false,
    mapDone: false,
    wireSequence: "",
    lockLetters: ["A", "A", "A", "A"],
    mapPairs: {},
    mapSel: null,
    serverCranked: 0,
    networkDone: false,
    serverOn: false,
    archiveAnswers: {},
    archiveSolved: false,
    chairSampled: false,
  },
};

const items = {
  coin: { name: "铜色代币", icon: "art-coin", desc: "2077 误读：注意力货币。真相：老周收银机的代币。他那一夜还在前台，盯着每台机器的异常。" },
  router: { name: "断裂路由器", icon: "art-router", desc: "2077 误读：小型祈愿器。真相：老周临走前硬拔下来的。路由器日志里有他看不懂的外部信号，他先当成断网故障。", anomaly: true },
  card: { name: "会员卡", icon: "art-cashier", desc: "2077 误读：部族身份牌。真相：阿丁的会员卡。能开失物箱、唤醒他常坐的 17 号机。" },
  photo: { name: "合影照片", icon: "art-photo", desc: "2077 误读：祭司合影。真相：老周和几个常客的合影。背面是阿丁的字：“又是这天，这次不一样。老周说别笑，我没笑。该回 ?O?E 了。”缺的两个字母是 O 和 E。", anomaly: true },
  drive: { name: "旧 U 盘", icon: "art-router", desc: "2077 误读：小型记忆骨。真相：老周把那一夜的异常全存了进去，插进服务器就能读。" },
  password: { name: "老周的留言", icon: "art-computer", desc: "2077 误读：归巢咒语。真相：老周在主屏上敲到一半的最后一句话，烧得只剩 LAST_STATE: H_M_。" },
  handle: { name: "手摇柄", icon: "art-locker", desc: "2077 误读：金属仪式柄。真相：应急电源的摇柄，用来唤醒断网的服务器。" },
  notebook: { name: "老周的手册", icon: "art-photo", desc: "2077 误读：祭坛维护经文。真相：老周的工作手册。前面全把异常记成“故障”，最后一页改了口：不是故障，是预警。座位登记残页：17→北门仓库、09→诊所、23→水塔。", anomaly: true },
  map: { name: "避难地图", icon: "art-map", desc: "2077 误读：城市祭祀路径。真相：阿丁去了 17 号对应的北门仓库。地图角落是当晚抢修顺序：北门、水塔、诊所、星河。" },
  network: { name: "局域网拓扑", icon: "art-server", desc: "2077 误读：幸存者星图。真相：灾后阿丁把星河、北门、水塔、诊所连成了离线互助网。" },
  ticket: { name: "包夜小票", icon: "art-ticket", desc: "2077 误读：货币与时间契约。真相：老周最早注意到的异常——小票反复打印 2012-12-21 23:59，他先以为是打印机坏了。", anomaly: true },
  idcopy: { name: "身份证复印件", icon: "art-id", desc: "2077 误读：年龄认证图腾。真相：读卡器报错 SURVIVAL CHECK FAILED。老周说从没见过这个错误码。", anomaly: true },
  noodle: { name: "半桶泡面", icon: "art-noodle", desc: "2077 误读：碳水供奉祭器。真相：老周的夜宵，没吃完。他那一夜一直没离开前台。", anomaly: true },
  keyboard: { name: "掉 W 键键盘", icon: "art-keyboard", desc: "2077 误读：字母禁忌图腾。真相：阿丁 17 号机的键盘，W 键磨没了，底下刻着“别后退”。", anomaly: true },
  earspoon: { name: "掏耳勺", icon: "art-spoon", desc: "2077 误读：精密探测仪。真相：没有真相，它只是掏耳勺。提醒考古队：不是所有旧物都承载宏大意义。", anomaly: true },
  stain: { name: "椅面样本", icon: "art-stain", desc: "2077 误读：长期静坐仪式残留。真相：连续停留超过 72 小时，灾变前网吧已经成了临时避难点。" },
};

const itemImages = {
  coin: "assets/items/coin.jpg",
  router: "assets/inspect/router.jpg",
  card: "assets/items/card.jpg",
  photo: "assets/inspect/photo.jpg",
  handle: "assets/items/handle.jpg",
  notebook: "assets/inspect/notebook.jpg",
  map: "assets/inspect/map.jpg",
  network: "assets/inspect/network.jpg",
  stain: "assets/items/stain.jpg",
  noodle: "assets/items/noodle.jpg",
  keyboard: "assets/items/keyboard.jpg",
  idcopy: "assets/inspect/idcopy.jpg",
  headset: "assets/items/headset.jpg",
  ticket: "assets/inspect/ticket.jpg",
  earspoon: "assets/items/earspoon.jpg",
  drive: "assets/items/drive.jpg",
};

const hotspotImages = {
  plaque: ["assets/inspect/plaque.jpg"],
  rubble: ["assets/items/coin.jpg"],
  router: ["assets/inspect/router.jpg"],
  price: ["assets/inspect/price.jpg"],
  cashier: ["assets/inspect/cashier.jpg"],
  lost: ["assets/inspect/lost.jpg"],
  noodle: ["assets/items/noodle.jpg"],
  ticket: ["assets/inspect/ticket.jpg"],
  idcopy: ["assets/inspect/idcopy.jpg"],
  drive: ["assets/inspect/drive.jpg"],
  pc17: ["assets/inspect/pc17.jpg"],
  locker: ["assets/inspect/locker.jpg"],
  graffiti: ["assets/inspect/graffiti.jpg"],
  keyboard: ["assets/items/keyboard.jpg"],
  headset: ["assets/inspect/headset.jpg"],
  chair: ["assets/inspect/chair.jpg"],
  log: ["assets/inspect/log.jpg"],
  map: ["assets/inspect/map.jpg"],
  switch: ["assets/inspect/switch.jpg"],
  server: ["assets/inspect/server.jpg"],
  earspoon: ["assets/items/earspoon.jpg"],
  truth: ["assets/inspect/truth.jpg"],
};

// Tripo 3D 英雄道具：这三个在近景检查里显示可旋转模型，其余仍用写实线索图。
const itemModels = {
  router: "assets/models/router.glb",
  drive: "assets/models/drive.glb",
};
const hotspotModels = {
  router: "assets/models/router.glb",
  headset: "assets/models/headset.glb",
  drive: "assets/models/drive.glb",
};

// 预加载所有图片，避免在网络上一条条刷出来（背景是 CSS background-image，
// 预热到浏览器缓存后切场景/检查遗物就是瞬时显示）。
// 首屏立刻要看的那张（标题页/入口）单独 eager 预热并预解码；其余背景、道具、近景、
// 人物图都挪到空闲期，避免一上来 8 张背景 + 1MB 的 3D 库一起抢带宽，把可见的第一张拖慢。
const firstScene = "assets/scene-entrance.jpg";
const restBackgrounds = [
  "assets/scene-entrance-no-coin.jpg",
  "assets/scene-entrance-no-router.jpg",
  "assets/scene-entrance-no-coin-router.jpg",
  "assets/scene-lobby.jpg",
  "assets/scene-hall.jpg",
  "assets/scene-hall-pc17-on.jpg",
  "assets/scene-admin.jpg",
];
function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
    if (img.decode) img.decode().catch(() => {}); // 预解码，切场景/近景打开时直接命中、不闪
  });
}
preloadImages([firstScene]);

// model-viewer(~1MB) 按需注入，且只注入一次。首个 3D 近景打开前若空闲期已注入则直接命中。
let modelViewerRequested = false;
function loadModelViewer() {
  if (modelViewerRequested) return;
  modelViewerRequested = true;
  const s = document.createElement("script");
  s.type = "module";
  s.src = "assets/vendor/model-viewer.min.js";
  document.body.appendChild(s);
}

function preloadRest() {
  const portraits = ["assets/characters/lead.jpg", "assets/characters/tech.jpg", "assets/characters/archivist.jpg"];
  const props = [...new Set([...Object.values(itemImages), ...Object.values(hotspotImages).flat()])];
  preloadImages([...restBackgrounds, ...portraits, ...props]);
  loadModelViewer(); // 首屏图都安排完了，再后台拉 3D 库，玩到 3D 近景时已就绪
}
if (typeof requestIdleCallback === "function") requestIdleCallback(preloadRest);
else setTimeout(preloadRest, 1200);

// 给近景检查面板设置媒体。
function setInspectMedia(modelSrc, backgroundImage) {
  if (modelSrc) {
    loadModelViewer(); // 兜底：空闲期若还没注入，这里立刻拉；<model-viewer> 会在脚本就绪后自动升级
    inspectArt.classList.add("has-model");
    inspectArt.style.backgroundImage = "";
    inspectArt.innerHTML = `
      <model-viewer
        src="${modelSrc}"
        camera-controls
        disable-pan
        touch-action="pan-y"
        interaction-prompt="none"
        loading="eager"
        exposure="0.62"
        shadow-intensity="0.6"
        shadow-softness="0"
        environment-image="neutral"
        camera-orbit="20deg 75deg 105%"
        min-field-of-view="20deg"
        max-field-of-view="45deg"
      ></model-viewer>
      <span class="model-hint">拖动旋转 · 滚轮缩放</span>`;
  } else {
    inspectArt.classList.remove("has-model");
    inspectArt.innerHTML = "";
    applyInspectPhoto(backgroundImage || "");
  }
}

// 先把图片解码好再贴成背景，避免设置 background-image 时先露出渐变底再刷出图（“闪一下”）。
// token 保证快速连续打开时只应用最后一张，旧图在新图解码完前不会被清掉。
let inspectPhotoToken = 0;
function applyInspectPhoto(bg) {
  const token = ++inspectPhotoToken;
  if (!bg) { inspectArt.style.backgroundImage = ""; return; }
  const url = bg.match(/url\("([^"]+)"\)/)?.[1];
  const apply = () => { if (token === inspectPhotoToken) inspectArt.style.backgroundImage = bg; };
  if (!url) { apply(); return; }
  const img = new Image();
  img.src = url;
  if (img.decode) img.decode().then(apply).catch(apply);
  else if (img.complete) apply();
  else { img.onload = apply; img.onerror = apply; }
}

// 结局线索板：把日常异常重新读成预警。每张卡只有一个 correct 选项。
const archiveCards = [
  {
    id: "ticket", need: "ticket", q: "包夜小票反复打印 2012-12-21 23:59",
    options: [
      { text: "打印机卡纸的重复故障", correct: false },
      { text: "机器在反复重报同一刻", correct: true },
    ],
  },
  {
    id: "idcopy", need: "idcopy", q: "读卡器错误码 SURVIVAL CHECK FAILED",
    options: [
      { text: "年龄认证系统的小毛病", correct: false },
      { text: "身份系统短暂变成了生存校验", correct: true },
    ],
  },
  {
    id: "noodle", need: "noodle", q: "没吃完的半桶泡面，叉子还插着",
    options: [
      { text: "普通的深夜宵夜", correct: false },
      { text: "有人把末日之夜当成又一个包夜", correct: true },
    ],
  },
  {
    id: "keyboard", need: "keyboard", q: "掉了 W 键的键盘，底下刻着“别后退”",
    options: [
      { text: "玩家手癖磨坏的旧键盘", correct: false },
      { text: "反复“向前”的本能，和没人听的叮嘱", correct: true },
    ],
  },
  {
    id: "photo", need: "photo", q: "合影背面阿丁写的“又是这天，这次不一样”",
    options: [
      { text: "老常客的随手玩笑", correct: false },
      { text: "有人确实察觉了，却没人接话", correct: true },
    ],
  },
  {
    id: "router", need: "router", q: "路由器日志里无法解释的外部信号",
    options: [
      { text: "上游断网导致的杂讯", correct: false },
      { text: "预警信号本身，被当成了故障", correct: true },
    ],
  },
  {
    id: "earspoon", need: "earspoon", q: "一枚被磨亮的掏耳勺",
    options: [
      { text: "它只是掏耳勺，没有别的意思", correct: true },
      { text: "某种精密的末日预警仪器", correct: false },
    ],
  },
];

const scenes = {
  entrance: {
    name: "坍塌外墙",
    className: "scene-entrance",
    enter: "2077 年，你站在一座 21 世纪网吧遗迹前。档案显示它停止营业于 2012 年，但墙体里的设备仍保留着异常记录。",
    hotspots: [
      { id: "plaque", x: 23, y: 0, w: 43, h: 31, title: "褪色招牌", prop: "prop-plaque", art: "art-photo", text: "红底招牌已经发黑，背面有维修字，署名“周”：停电找前台代币，17 号机有我的留言。另一行更旧、写得更急：2012-12-21 别拔路由器，断网比停电更可怕。", onOpen: () => state.flags.plaque = true },
      { id: "rubble", x: 32, y: 90, w: 4, h: 6, title: "瓦砾堆里的代币", prop: "prop-coin", art: "art-coin", text: "碎砖之间压着一枚圆形金属片。", actions: [{ label: "拾取代币", run: () => take("coin", "你拾起铜色代币。它冰冷、粗糙，像某种被废弃的通行凭证。") }] },
      { id: "router", x: 75, y: 6, w: 9, h: 15, title: "墙上黑盒", prop: "prop-router", art: "art-router", text: "一个黑色盒子卡在塌墙钢筋上，几根天线像断掉的触须。接口不像自然腐蚀，更像被人临走前硬拔下来。", actions: [{ label: "取下黑盒", run: () => take("router", "你取下断裂路由器。记录员低声说：这东西也许曾经让人们隔空说话。") }] },
    ],
  },
  lobby: {
    name: "前台遗址",
    className: "scene-lobby",
    enter: "前台像一座小祭坛。价目表、收银机、读卡器和失物箱被灰尘封在一起，所有设备都停在 2012 年。",
    hotspots: [
      { id: "price", x: 63, y: 2, w: 26, h: 35, title: "价目表", prop: "prop-price", art: "art-photo", text: "残缺价目表上能读到：包夜、会员、加钟。价目表角落有一串被烟头烫断的日期：2012-12-21。又是这一天。" },
      { id: "cashier", x: 17, y: 49, w: 27, h: 26, title: "收银机", prop: "prop-cashier", art: "art-cashier", text: "抽屉锈死，投币口旁有新旧不一的刮痕。打印口还卡着一截没吐完的纸。", controls: "cashier" },
      { id: "lost", x: 57, y: 45, w: 6, h: 10, title: "失物格", prop: "prop-lostbox", art: "art-photo", text: "右侧的失物格里压着卡片、旧书和一个带读卡槽的小盒。", controls: "lostbox" },
      { id: "noodle", x: 68, y: 68, w: 9, h: 21, title: "半桶泡面", prop: "prop-noodle", art: "art-noodle", text: "前台后面半桶发黑泡面，叉子还插着，没吃完。像是值夜班的人一直没腾出手——那一夜他始终守在这里。", actions: [{ label: "封存泡面", run: () => take("noodle", "你封存半桶泡面。值夜的人没来得及吃完它。") }] },
      { id: "ticket", x: 48, y: 84, w: 8, h: 8, title: "包夜小票", prop: "prop-ticket", art: "art-ticket", text: "一张油污小票，背面反复打印着同一行错误时间：2012-12-21 23:59。打印口的磨损说明它被吐出过很多次，像有人盯着它看了一整夜。", actions: [{ label: "收起小票", run: () => take("ticket", "你收起包夜小票。机器把同一分钟喊了很多遍，当年的人以为只是打印机坏了。") }] },
      { id: "idcopy", x: 56, y: 77, w: 8, h: 11, title: "身份证复印件", prop: "prop-id", art: "art-id", text: "一张被水泡开的证件复印件，边缘有读卡错误码：SURVIVAL CHECK FAILED。旁边有人用笔写了一句：这码我没见过。——周", actions: [{ label: "收起复印件", run: () => take("idcopy", "你收起身份证复印件。‘生存校验失败’——连守了多年前台的人都没见过这个错误码。") }] },
    ],
  },
  hall: {
    name: "机房大厅",
    className: "scene-hall",
    enter: "一排排电脑像沉默的石碑。这里没有人，只有键盘上被磨亮的字母，以及一台被反复重启过的 17 号机。",
    hotspots: [
      { id: "pc17", x: 31, y: 34, w: 31, h: 38, title: "17 号机", prop: "prop-monitor", art: "art-computer", text: "阿丁常坐的机子，读卡器还连在旁边。这台屏没黑透——它接着网吧主屏，老周最后那句话也许还卡在上面。", controls: "pc17" },
      { id: "locker", x: 82, y: 12, w: 14, h: 53, title: "储物柜", prop: "prop-locker", art: "art-locker", text: "老周的柜子，四位字母锁，锁面贴着“17”。他把手册锁在了阿丁那台机子的编号下。", controls: "locker" },
      { id: "graffiti", x: 0, y: 6, w: 34, h: 28, title: "墙面色带", prop: "prop-graffiti", art: "art-map", text: "墙上四条颜色对应地点：红=北门，蓝=水塔，黄=诊所，绿=星河。只是涂鸦，没标先后——顺序得去管理员小屋的地图上找。" },
      { id: "keyboard", x: 24, y: 78, w: 40, h: 16, title: "掉了 W 键的键盘", prop: "prop-keyboard", art: "art-keyboard", text: "阿丁那台机子的键盘，W 键磨没了，磨损深得不正常。键盘底下刻着一行小字：别后退。", actions: [{ label: "取走键盘", run: () => take("keyboard", "你取走阿丁的键盘。底下那行“别后退”，像他给自己刻的。") }] },
      { id: "headset", x: 22, y: 65, w: 9, h: 12, title: "发霉耳机", prop: "prop-headset", art: "art-headset", text: "耳罩里长出灰绿色霉斑。考古札记：听觉隔离装置，证明此族群存在严重的社交回避倾向。也可能只是太吵了。" },
      { id: "chair", x: 82, y: 69, w: 18, h: 30, title: "椅子上的污渍", prop: "prop-stain", art: "art-stain", text: "椅面有一片边界复杂的深色污渍。考古札记：碳 14 检测显示连续坐立时间超过 72 小时。", actions: [{ label: "采集样本", run: () => { state.flags.chairSampled = true; take("stain", "你封存椅面样本。记录员坚持要给它单独编号。"); } }] },
      { id: "drive", x: 26, y: 88, w: 7, h: 8, title: "地上的 U 盘", prop: "prop-drive", art: "art-router", text: "地面线缆旁落着一个裂开的 U 盘。", actions: [{ label: "取出 U 盘", run: () => take("drive", "你得到旧 U 盘。它像一粒很轻的骨头，却可能装着很重的记忆。") }] },
    ],
  },
  admin: {
    name: "管理员小屋",
    className: "scene-admin",
    enter: "管理员小屋保存得更完整。服务器机柜旁有应急电源，桌上摊着潮湿的地图碎片，像有人在最后几小时试图解释一切。",
    hotspots: [
      { id: "log", x: 27, y: 69, w: 8, h: 8, title: "工作日志", prop: "prop-log", art: "art-photo", text: "前半本是老周的字，把异常一条条记成“故障”。最后几页换了另一种字迹——是阿丁的：老周没撑过那晚，但他让我回家，我照做了，所以我还在。现在这里成了大家的中转站，每天有人来同步水源、药品和路线。" },
      { id: "map", x: 7, y: 68, w: 22, h: 12, title: "地图碎片", prop: "prop-map", art: "art-map", text: "地图被水泡过，只剩座位号和几个地名。把座位号和避难点对上，就知道当晚谁去了哪、按什么顺序抢修。", controls: "map" },
      { id: "switch", x: 64, y: 9, w: 15, h: 33, title: "交换机", prop: "prop-switch", art: "art-router", text: "线缆散落，缺一个路由器。颜色对应地点（看机房涂鸦），顺序要看地图上的抢修先后。", controls: "wire" },
      { id: "server", x: 48, y: 6, w: 15, h: 64, title: "离线服务器", prop: "prop-server", art: "art-server", text: "服务器没有联网，却还保留着本地资料库。应急电源缺少摇柄。", controls: "server" },
      { id: "earspoon", x: 14, y: 89, w: 5, h: 5, title: "掏耳勺", prop: "prop-spoon", art: "art-spoon", text: "一枚细长金属小器具，尖端被磨得发亮。考古札记：用途不明，可能是某种精密仪器。后续注释：队医说别乱猜。", actions: [{ label: "收起小器具", run: () => take("earspoon", "你收起掏耳勺。记录员给它写了三种完全错误的用途。") }] },
    ],
  },
  ending: {
    name: "复兴线索",
    className: "scene-ending",
    enter: "旧服务器发出微弱的光。你们没有找到武器，也没有找到神谕，只找到老周存下的那份 2012_LOCAL_WARNING_ARCHIVE，和阿丁后来续写的部分。",
    hotspots: [
      { id: "truth", x: 30, y: 22, w: 42, h: 42, title: "2012 预警档案", art: "art-server", text: "预警抵达了。它藏在小票的时间戳、读卡器的报错、路由器的杂讯里。大多数人把它当成机器坏了——老周没能让他们相信，他自己也没撑过那一夜。但有一个人信了：阿丁回了家，活了下来，把这间网吧接成了之后所有幸存者的中转站。问题从来不是世界没出声，而是要在噪音里听见那一个真的在喊的声音——并且，至少做那个听见的人。" },
    ],
  },
};

const sceneEl = document.getElementById("scene");
const sceneLabel = document.getElementById("sceneLabel");
const stageEl = document.getElementById("stage");
const flashEl = document.getElementById("flash");
const hotspotsEl = document.getElementById("hotspots");
const captionEl = document.getElementById("caption");
const inventoryEl = document.getElementById("inventory");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const inspect = document.getElementById("inspect");
const inspectArt = document.getElementById("inspectArt");
const inspectTitle = document.getElementById("inspectTitle");
const inspectText = document.getElementById("inspectText");
const inspectControls = document.getElementById("inspectControls");
const speakerPortrait = document.getElementById("speakerPortrait");
const speakerName = document.getElementById("speakerName");
const speakerLine = document.getElementById("speakerLine");
const dialogueEl = document.getElementById("dialogue");
const dialogueNext = document.getElementById("dialogueNext");
const dialogueBlocker = document.getElementById("dialogueBlocker");
const gameEl = document.getElementById("game");
const endingScreen = document.getElementById("endingScreen");
const endingBody = document.getElementById("endingBody");
const endingStats = document.getElementById("endingStats");
const endingRestart = document.getElementById("endingRestart");
let activeHotspot = null;
let dialogueQueue = [];

// ===== 音频：BGM 循环 + 人物配音（edge-tts 生成）=====
let voiceManifest = {};
let soundOn = true;
const bgm = new Audio("assets/audio/bgm.wav");
bgm.loop = true;
bgm.volume = 0.55;
const voicePlayer = new Audio();
voicePlayer.volume = 0.95;

fetch("assets/audio/voice/manifest.json")
  .then((r) => (r.ok ? r.json() : {}))
  .then((m) => { voiceManifest = m || {}; })
  .catch(() => {});

function playVoice(line) {
  return; // 人物配音已取消，保留函数避免改动调用处
  if (!soundOn) return;
  const file = voiceManifest[line];
  if (!file) return;
  try {
    voicePlayer.pause();
    voicePlayer.currentTime = 0;
    voicePlayer.src = `assets/audio/voice/${file}`;
    voicePlayer.play().catch(() => {});
  } catch (e) { /* 配音缺失时静默 */ }
}

function startBgm() {
  if (!soundOn) return;
  bgm.play().catch(() => {});
}

function setSound(on) {
  soundOn = on;
  if (!on) {
    bgm.pause();
    voicePlayer.pause();
  } else {
    startBgm();
  }
  const btn = document.getElementById("soundBtn");
  if (btn) btn.textContent = on ? "声音" : "静音";
}

// ===== 点击音效 + 首次交互兜底启动 BGM（防止自动播放被拦） =====
// 不同操作用不同音效：UI 点击 / 拾取物品 / 查看线索 / 解谜成功
const sfx = {
  click: new Audio("assets/audio/click.wav"),
  pickup: new Audio("assets/audio/pickup.wav"),
  inspect: new Audio("assets/audio/inspect.wav"),
  success: new Audio("assets/audio/success.wav"),
};
sfx.click.volume = 0.4;
sfx.pickup.volume = 0.55;
sfx.inspect.volume = 0.45;
sfx.success.volume = 0.5;
function playSfx(name) {
  if (!soundOn) return;
  const a = sfx[name];
  if (!a) return;
  try { a.currentTime = 0; a.play().catch(() => {}); } catch (e) {}
}
function playClick() { playSfx("click"); }
function playPickup() { playSfx("pickup"); }
function playInspect() { playSfx("inspect"); }
function playSuccess() { playSfx("success"); }
document.addEventListener(
  "click",
  (e) => {
    if (!soundOn) return;
    startBgm(); // 任意点击后确保 BGM 在放（浏览器要求用户手势）
    const el = e.target;
    if (el.closest(".inspect-action")) playPickup();          // 弹窗里的动作（拾取/采集/收起等）
    else if (el.closest(".hotspot")) playInspect();           // 点场景物件＝看线索
    else if (el.closest(".tool-btn, .walk-arrow, .dialogue-next, .close-btn, #startBtn, #endingRestart")) playClick();
  },
  true
);

const characters = {
  lead: { name: "沈砚 / 队长", portrait: "assets/characters/lead.jpg" },
  tech: { name: "林夏 / 技术员", portrait: "assets/characters/tech.jpg" },
  archivist: { name: "许弥 / 档案员", portrait: "assets/characters/archivist.jpg" },
};

// 拾取道具时的单句旁白（轻量）。
const itemDialogue = {
  coin: ["archivist", "招牌上署名‘周’。看来那一夜守前台的，是个叫老周的网管。"],
  router: ["tech", "接口是被人硬拔的。老周在招牌上写过：别拔路由器。可最后拔它的，好像就是他自己。"],
  drive: ["tech", "U 盘还能读。老周把那一夜的异常全存了进去——就等服务器醒过来。"],
  ticket: ["archivist", "同一分钟被打印了很多遍。老周盯着它看了一夜，先以为是打印机坏了。"],
  idcopy: ["lead", "‘生存校验失败’。连守了多年前台的老周都没见过这个码。"],
  noodle: ["archivist", "夜宵没吃完。老周那一夜一直没离开前台。"],
  keyboard: ["tech", "阿丁那台机子的键盘。W 键磨穿了，底下刻着‘别后退’——像他给自己刻的。"],
  earspoon: ["archivist", "这个我收回，它大概真的只是掏耳勺。考古最怕把什么都解释得太宏大。"],
  stain: ["tech", "连续停留超过七十二小时。灾变前，这里已经不只是网吧了。"],
};

// 解开机关时的多句剧情节拍（剧情 + 下一步指引）。
const solveBeats = {
  card: [
    ["tech", "抽屉弹开了。会员卡是阿丁的——他是这儿的常客。打印口还卡着张小票，反复打印同一分钟。"],
    ["archivist", "2012-12-21 23:59。老周盯着它看了一夜，先以为是打印机坏了。"],
    ["lead", "用阿丁的卡，能开失物箱、唤醒他的 17 号机。一步步来。"],
  ],
  photo: [
    ["archivist", "老周和几个常客的合影。背面是阿丁的字：‘又是这天，这次不一样。老周说别笑，我没笑。’"],
    ["lead", "所以那一夜，老周真的在警告大家。至少阿丁，把他的话听进去了。照片背面那两个字母带上。"],
  ],
  pc17: [
    ["tech", "屏幕接着网吧主屏。老周最后那句话只敲了一半，烧得只剩 LAST_STATE: H_M_。"],
    ["archivist", "他想让大家做什么？缺的两个字母，阿丁写在照片背面了——O 和 E。"],
    ["lead", "H_M_ 补成 HOME。老周的柜子就贴着 17，去开它。"],
  ],
  locker: [
    ["archivist", "H-O-M-E。回家。老周最后想说的就是这两个字——都回家。"],
    ["lead", "他的手册和手摇柄在里面。手册最后一页改了口：不是故障，是预警。去管理员小屋。"],
  ],
  map: [
    ["archivist", "17 号不是座位，是北门仓库。阿丁照老周说的回了家——去的就是这里。"],
    ["tech", "地图角落是抢修顺序：北门、水塔、诊所，最后回星河。接线照这个来。"],
  ],
  network: [
    ["tech", "红、蓝、黄、绿，按北门到星河接好了。离线拓扑亮了——这张网是阿丁后来一点点接起来的。"],
    ["lead", "网络回来了。给服务器供电，读老周存下的东西。"],
  ],
  server: [
    ["tech", "供电稳住了，服务器在黑暗里重新学会呼吸。"],
    ["lead", "插上 U 盘。我们看看老周那一夜，到底想留下什么。"],
  ],
  archiveOpen: [
    ["archivist", "档案锁着。老周要我们先把这些异常重新读一遍——当年没人读懂的那一遍。"],
    ["lead", "对每件旧物做判断：是故障，还是预警。读对了，档案才会开。"],
  ],
};

function say(characterId, line) {
  const character = characters[characterId] || characters.lead;
  dialogueEl.classList.remove("hidden");
  speakerPortrait.src = character.portrait;
  speakerName.textContent = character.name;
  speakerLine.textContent = line;
  playVoice(line);
}

function setDialogueLock(on) {
  gameEl.classList.toggle("dialogue-lock", on);
  dialogueBlocker.classList.toggle("hidden", !on);
}

function queueDialogue(lines) {
  dialogueQueue = [...lines];
  setDialogueLock(true);
  nextDialogue();
}

function nextDialogue() {
  if (dialogueQueue.length === 0) {
    dialogueEl.classList.add("hidden");
    setDialogueLock(false);
    return;
  }
  const [characterId, line] = dialogueQueue.shift();
  say(characterId, line);
}

function setCaption(text) {
  captionEl.textContent = text;
}

function flash() {
  flashEl.classList.remove("success");
  flashEl.classList.remove("active");
  void flashEl.offsetWidth;
  flashEl.classList.add("active");
}

function success() {
  flashEl.classList.remove("active");
  flashEl.classList.remove("success");
  void flashEl.offsetWidth;
  flashEl.classList.add("success");
  playSuccess();
}

function has(item) {
  return state.inventory.includes(item);
}

function take(item, message, beat) {
  if (!has(item)) {
    state.inventory.push(item);
    animatePickup(item);
  }
  closeInspect();
  setCaption(message || `取得：${items[item].name}`);
  if (beat) {
    queueDialogue(beat);
  } else if (itemDialogue[item]) {
    say(itemDialogue[item][0], itemDialogue[item][1]);
  }
  render();
}

function animatePickup(item) {
  if (!activeHotspot) return;
  const fly = document.createElement("div");
  fly.className = `pickup-fly ${items[item]?.icon || ""}`;
  const x = activeHotspot.x + activeHotspot.w / 2;
  const y = activeHotspot.y + activeHotspot.h / 2;
  fly.style.left = `${x}%`;
  fly.style.top = `${y}%`;
  fly.style.setProperty("--x", `${x}vw`);
  fly.style.setProperty("--y", `${y}vh`);
  stageEl.appendChild(fly);
  if (typeof setTimeout === "function") {
    setTimeout(() => fly.remove(), 760);
  }
}

function playObjectAction(id) {
  stageEl.classList.remove(`act-${id}`);
  void stageEl.offsetWidth;
  stageEl.classList.add(`act-${id}`);
  if (typeof setTimeout === "function") {
    setTimeout(() => stageEl.classList.remove(`act-${id}`), 680);
  }
}

function go(scene) {
  state.scene = scene;
  state.selected = null;
  closeInspect();
  setCaption(scenes[scene].enter);
  sceneDialogue(scene);
  stageEl.classList.add("walking");
  if (typeof setTimeout === "function") {
    setTimeout(() => stageEl.classList.remove("walking"), 520);
  }
  render();
}

function sceneDialogue(scene) {
  const lines = {
    entrance: [
      ["lead", "2077 年第 34 次地表考察。目标不是找古董，是搞清楚人类当年到底错过了什么。"],
      ["tech", "信号源就在这栋楼里，频段卡在 2012 年。这地方停摆得太突然了。"],
      ["archivist", "星河网吧。先看外墙——招牌背面常有维修留言，比传说可靠。瓦砾和墙上那个黑盒子也别放过。"],
    ],
    lobby: [
      ["archivist", "前台守了一夜的人姓周。这些日常物件，比纪念碑更诚实。"],
      ["tech", "收银机还认代币。沈队，先把它喂醒，看看老周那晚记了什么。"],
      ["lead", "把设备一个个唤醒，不对劲的旧物都带上——它们后面都要用。"],
    ],
    hall: [
      ["tech", "机房里有台 17 号机，是个叫阿丁的常客的位置。先刷卡唤醒，再开老周的柜子。"],
      ["archivist", "墙上那排彩色线像灾后路线图。键盘、泡面、耳机——日常最容易藏住异常，能带的都带上。"],
    ],
    admin: [
      ["lead", "管理员小屋是最后的记录点。老周和阿丁的故事，应该在这里合流。"],
      ["tech", "服务器断网了，得先恢复局域网和供电，它才肯交出老周的档案。"],
      ["archivist", "桌上的地图和工作日志我来读。先弄清那一夜，谁走了，谁留下了。"],
    ],
    ending: [
      ["archivist", "老周没能让所有人相信，但阿丁信了。预警抵达了，也终于有人听懂了。"],
      ["lead", "2077 年我们要找的不是答案，是重新听懂警报的能力——以及，做那个听见的人。"],
    ],
  };
  if (lines[scene]) queueDialogue(lines[scene]);
}

// 场景 class（去掉前缀 "scene "）→ 背景图，用于切换前预解码。
// 旧背景在新图解码完成前保持不动，换 class 时新图已可即时栅格化，不再露出渐变底“闪一下”。
const sceneBgUrl = {
  "scene-entrance": "assets/scene-entrance.jpg",
  "scene-entrance variant-no-coin": "assets/scene-entrance-no-coin.jpg",
  "scene-entrance variant-no-router": "assets/scene-entrance-no-router.jpg",
  "scene-entrance variant-no-coin-router": "assets/scene-entrance-no-coin-router.jpg",
  "scene-lobby": "assets/scene-lobby.jpg",
  "scene-hall": "assets/scene-hall.jpg",
  "scene-hall variant-pc17-on": "assets/scene-hall-pc17-on.jpg",
  "scene-admin": "assets/scene-admin.jpg",
};
let sceneClassToken = 0;
function applySceneClass(cls) {
  if (sceneEl.className === cls) return; // 没变就别动，避免无谓重绘
  const token = ++sceneClassToken;
  const url = sceneBgUrl[cls.replace(/^scene\s+/, "")];
  const apply = () => { if (token === sceneClassToken) sceneEl.className = cls; };
  if (!url) { apply(); return; } // 无图（如结局场景）直接换
  const img = new Image();
  img.src = url;
  if (img.decode) img.decode().then(apply).catch(apply);
  else if (img.complete) apply();
  else { img.onload = apply; img.onerror = apply; }
}

function render() {
  const scene = scenes[state.scene];
  applySceneClass(`scene ${scene.className} ${sceneVariantClass()}`.trim());
  const index = order.indexOf(state.scene);
  sceneLabel.textContent = index >= 0 ? `${index + 1}/4  ${scene.name}` : scene.name;
  hotspotsEl.innerHTML = "";
  scene.hotspots.forEach((hotspot) => {
    const button = document.createElement("button");
    button.className = `hotspot ${hotspot.prop || ""}`;
    const stateClass = hotspotStateClass(hotspot);
    if (stateClass) button.classList.add(...stateClass.split(" "));
    button.style.left = `${hotspot.x}%`;
    button.style.top = `${hotspot.y}%`;
    button.style.width = `${hotspot.w}%`;
    button.style.height = `${hotspot.h}%`;
    button.setAttribute("aria-label", hotspot.title);
    button.addEventListener("click", () => openInspect(hotspot));
    hotspotsEl.appendChild(button);
  });

  leftArrow.disabled = index <= 0 || state.scene === "ending";
  rightArrow.disabled = index < 0 || index >= order.length - 1 || state.scene === "ending";

  renderInventory();
}

function sceneVariantClass() {
  if (state.scene === "hall" && state.flags.passwordKnown) return "variant-pc17-on";
  if (state.scene !== "entrance") return "";
  const coinTaken = has("coin");
  const routerTaken = has("router");
  if (coinTaken && routerTaken) return "variant-no-coin-router";
  if (coinTaken) return "variant-no-coin";
  if (routerTaken) return "variant-no-router";
  return "";
}

function hotspotStateClass(hotspot) {
  const solved = {
    cashier: has("card"),
    lost: has("photo"),
    pc17: state.flags.passwordKnown,
    locker: state.flags.lockerOpen,
    map: state.flags.mapDone,
    switch: state.flags.networkDone,
    server: state.flags.serverOn,
  };
  const collected = {
    rubble: has("coin"),
    router: has("router"),
    ticket: has("ticket"),
    idcopy: has("idcopy"),
    noodle: has("noodle"),
    keyboard: has("keyboard"),
    drive: has("drive"),
    chair: has("stain"),
    earspoon: has("earspoon"),
  };
  if (solved[hotspot.id]) return "solved";
  if (collected[hotspot.id]) return "collected";
  return "";
}

function renderInventory() {
  inventoryEl.innerHTML = "";
  inventoryEl.parentElement.classList.toggle("empty", state.inventory.length === 0);
  state.inventory.forEach((item) => {
    const button = document.createElement("button");
    button.className = `item-btn ${state.selected === item ? "selected" : ""}`;
    const imgStyle = itemImages[item] ? ` style="background-image: url('${itemImages[item]}')"` : "";
    button.innerHTML = `<span class="item-icon ${items[item].icon}"${imgStyle}></span>${items[item].name}`;
    button.addEventListener("click", () => {
      openItemDetail(item);
      render();
    });
    inventoryEl.appendChild(button);
  });
}

function openItemDetail(item) {
  state.selected = state.selected === item ? null : item;
  inspect.classList.remove("hidden");
  const itemModel = itemModels[item];
  inspectArt.className = `inspect-art ${items[item].icon || ""}${itemImages[item] && !itemModel ? " has-photo" : ""}`;
  setInspectMedia(
    itemModel,
    itemImages[item] ? `linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.2)), url("${itemImages[item]}")` : ""
  );
  inspectTitle.textContent = items[item].name;
  inspectText.textContent = items[item].desc;
  inspectControls.innerHTML = "";

  const select = document.createElement("button");
  select.className = "inspect-action";
  select.textContent = state.selected === item ? "已选中" : "选中道具";
  select.addEventListener("click", () => {
    state.selected = item;
    closeInspect();
    setCaption(`已选中：${items[item].name}`);
    render();
  });

  const putDown = document.createElement("button");
  putDown.className = "inspect-action";
  putDown.textContent = "放下";
  putDown.addEventListener("click", () => {
    state.selected = null;
    closeInspect();
    setCaption("你把样本放回袋中。");
    render();
  });

  inspectControls.append(select, putDown);
}

function openInspect(hotspot) {
  activeHotspot = hotspot;
  if (hotspot.onOpen) hotspot.onOpen();
  inspect.classList.remove("hidden");
  const hsImg = hotspotImages[hotspot.id]?.[0];
  const hsModel = hotspotModels[hotspot.id] || null;
  inspectArt.className = `inspect-art ${hotspot.art || ""}${hsImg && !hsModel ? " has-photo" : ""}`;
  setInspectMedia(
    hsModel,
    hsImg ? `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.32)), url("${hsImg}")` : ""
  );
  inspectTitle.textContent = hotspot.title;
  inspectText.textContent = hotspot.text;
  inspectControls.innerHTML = "";

  if (hotspot.controls === "locker") renderLockerControls();
  if (hotspot.controls === "wire") renderWireControls();
  if (hotspot.controls === "cashier") renderCashierControls();
  if (hotspot.controls === "lostbox") renderLostboxControls();
  if (hotspot.controls === "pc17") renderPc17Controls();
  if (hotspot.controls === "map") renderMapControls();
  if (hotspot.controls === "server") renderServerControls();
  if (hotspot.controls === "archive") renderArchiveControls();

  (hotspot.actions || []).forEach((action) => {
    const button = document.createElement("button");
    button.className = "inspect-action";
    button.textContent = action.label;
    button.addEventListener("click", () => {
      if (action.need && !has(action.need)) {
        setCaption(`这里需要用到：${items[action.need].name}`);
        return;
      }
      playObjectAction(hotspot.id);
      action.run();
    });
    inspectControls.appendChild(button);
  });
}

function renderCashierControls() {
  const panel = document.createElement("div");
  panel.className = `mechanism-panel coin-slot ${has("card") ? "open" : ""}`;
  panel.innerHTML = `
    <div class="slot-track"><span></span></div>
    <div class="drawer-gap"></div>
    <p>${has("card") ? "DRAWER OPEN" : "INSERT TOKEN"}</p>
  `;

  const button = document.createElement("button");
  button.className = "inspect-action";
  button.textContent = has("card") ? "抽屉已打开" : "塞入代币";
  button.disabled = has("card");
  button.addEventListener("click", () => {
    if (!has("coin")) {
      setCaption("投币口旁的圆形刮痕，尺寸和代币差不多。先去瓦砾里找代币。");
      return;
    }
    state.flags.cashierOpen = true;
    playObjectAction("cashier");
    success();
    take("card", "代币滑入投币口，抽屉咔哒弹出。里面压着一张会员卡，打印口卡着一张反复打印的小票。", solveBeats.card);
    if (!has("ticket")) state.inventory.push("ticket");
    render();
  });

  inspectControls.append(panel, button);
}

function renderLostboxControls() {
  const panel = document.createElement("div");
  panel.className = `mechanism-panel card-reader ${has("photo") ? "open" : ""}`;
  panel.innerHTML = `
    <div class="reader-line"></div>
    <div class="lid-gap"></div>
    <p>${has("photo") ? "ACCESS GRANTED" : "MEMBER CARD REQUIRED"}</p>
  `;

  const button = document.createElement("button");
  button.className = "inspect-action";
  button.textContent = has("photo") ? "箱盖已打开" : "刷会员卡";
  button.disabled = has("photo");
  button.addEventListener("click", () => {
    if (!has("card")) {
      setCaption("读卡槽没有反应。它在等一张属于这里的卡。先去收银机拿会员卡。");
      return;
    }
    state.flags.photoFound = true;
    playObjectAction("lost");
    success();
    take("photo", "读卡槽亮了一下，失物箱弹开。你找到一张合影照片，背面写着字。", solveBeats.photo);
  });

  inspectControls.append(panel, button);
}

function renderPc17Controls() {
  const panel = document.createElement("div");
  panel.className = `mechanism-panel dead-screen ${state.flags.passwordKnown ? "online" : ""}`;
  panel.innerHTML = `
    <div class="scanline"></div>
    <p>${state.flags.passwordKnown ? "LAST_STATE: H_M_" : "NO MEMBER SESSION"}</p>
  `;

  const button = document.createElement("button");
  button.className = "inspect-action";
  button.textContent = state.flags.passwordKnown ? "屏幕已唤醒" : "刷会员卡";
  button.disabled = state.flags.passwordKnown;
  button.addEventListener("click", () => {
    if (!has("card")) {
      setCaption("17 号机旁的读卡器还锁着。没有会员卡，屏幕无法唤醒。");
      return;
    }
    state.flags.passwordKnown = true;
    playObjectAction("pc17");
    success();
    take("password", "屏幕亮起，烧得只剩 LAST_STATE: H_M_。角落还有一句：网管手册在储物柜，柜号 17。", solveBeats.pc17);
  });

  inspectControls.append(panel, button);
}

function renderWireControls() {
  if (!has("router")) {
    const button = document.createElement("button");
    button.className = "inspect-action";
    button.textContent = "缺少路由器";
    button.addEventListener("click", () => setCaption("交换机中间空着。你需要先找到那个断裂黑盒（外墙）。"));
    inspectControls.appendChild(button);
    return;
  }

  if (!state.flags.mapDone) {
    const button = document.createElement("button");
    button.className = "inspect-action";
    button.textContent = "线序不明";
    button.addEventListener("click", () => setCaption("颜色对应地点（机房涂鸦），但抢修顺序要看地图。先把桌上的地图对好。"));
    inspectControls.appendChild(button);
    return;
  }

  const board = document.createElement("div");
  board.className = "wire-board";
  const status = document.createElement("div");
  status.className = "wire-status";
  status.textContent = `接线进度：${(state.flags.wireSequence || "").padEnd(4, "_")}`;
  [
    ["R", "红 · 北门", "red"],
    ["B", "蓝 · 水塔", "blue"],
    ["Y", "黄 · 诊所", "yellow"],
    ["G", "绿 · 星河", "green"],
  ].forEach(([value, label, color]) => {
    const button = document.createElement("button");
    button.className = `wire-btn ${color}`;
    button.textContent = label;
    button.addEventListener("click", () => {
      state.flags.wireSequence += value;
      status.textContent = `接线进度：${state.flags.wireSequence.padEnd(4, "_")}`;
      if (!"RBYG".startsWith(state.flags.wireSequence)) {
        state.flags.wireSequence = "";
        status.textContent = "接线进度：____";
        flash();
        setCaption("线缆刚接上就短促闪烁。顺序错了。地图上的抢修先后：北门、水塔、诊所、星河。");
        return;
      }
      if (state.flags.wireSequence === "RBYG") {
        playObjectAction("switch");
        networkPuzzle();
        return;
      }
      setCaption(`已接入 ${state.flags.wireSequence.length}/4 根线。`);
    });
    board.appendChild(button);
  });
  inspectControls.append(status, board);
}

function renderLockerControls() {
  const lock = document.createElement("div");
  lock.className = "letter-lock";

  state.flags.lockLetters.forEach((letter, index) => {
    const wheel = document.createElement("div");
    wheel.className = "letter-wheel";

    const up = document.createElement("button");
    up.className = "wheel-btn";
    up.textContent = "▲";
    up.addEventListener("click", () => {
      rotateLetter(index, 1);
      openInspect(activeHotspot);
    });

    const face = document.createElement("div");
    face.className = "wheel-face";
    face.textContent = letter;

    const down = document.createElement("button");
    down.className = "wheel-btn";
    down.textContent = "▼";
    down.addEventListener("click", () => {
      rotateLetter(index, -1);
      openInspect(activeHotspot);
    });

    wheel.append(up, face, down);
    lock.appendChild(wheel);
  });

  const button = document.createElement("button");
  button.className = "inspect-action";
  button.textContent = "开锁";
  button.addEventListener("click", () => {
    if (!state.flags.passwordKnown) {
      setCaption("你还没唤醒 17 号机，不知道密码残留。先去刷卡点亮屏幕。");
      return;
    }
    if (!has("photo")) {
      setCaption("屏幕只剩 H_M_，缺两个字母。那两个字母也许写在某张旧照片背面。");
      return;
    }
    if (state.flags.lockLetters.join("") !== "HOME") {
      flash();
      setCaption(`锁芯没有反应。当前是 ${state.flags.lockLetters.join("")}。把 H_M_ 补成完整的词。`);
      return;
    }
    unlockLocker();
  });

  // 演示用：直接开锁，不显示答案
  const demoButton = document.createElement("button");
  demoButton.className = "inspect-action demo-action";
  demoButton.textContent = "直接打开（演示）";
  demoButton.addEventListener("click", () => unlockLocker());

  inspectControls.append(lock, button, demoButton);
}

function unlockLocker() {
  if (state.flags.lockerOpen) return;
  state.flags.lockerOpen = true;
  playObjectAction("locker");
  success();
  if (!has("handle")) state.inventory.push("handle");
  if (!has("notebook")) state.inventory.push("notebook");
  closeInspect();
  setCaption("储物柜弹开。你拿到手摇柄，柜底还压着一本网管手册。");
  queueDialogue(solveBeats.locker);
  render();
}

function rotateLetter(index, direction) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const current = letters.indexOf(state.flags.lockLetters[index]);
  const next = (current + direction + letters.length) % letters.length;
  state.flags.lockLetters[index] = letters[next];
}

// 地图匹配：把座位号连到避难点，依据网管手册的登记残页。
const mapMatch = {
  seats: [["17", "17 号"], ["09", "09 号"], ["23", "23 号"]],
  places: [["north", "北门仓库"], ["clinic", "诊所"], ["tower", "水塔"]],
  answer: { "17": "north", "09": "clinic", "23": "tower" },
};

function renderMapControls() {
  if (!has("photo") || !has("notebook")) {
    const button = document.createElement("button");
    button.className = "inspect-action";
    button.textContent = "缺少参照";
    button.addEventListener("click", () => setCaption("地图缺少参照。你需要合影照片和网管手册（储物柜里）。"));
    inspectControls.appendChild(button);
    return;
  }

  const wrap = document.createElement("div");
  wrap.className = "map-match";

  const left = document.createElement("div");
  left.className = "map-col";
  mapMatch.seats.forEach(([id, label]) => {
    const b = document.createElement("button");
    const placed = state.flags.mapPairs[id];
    b.className = `map-cell seat ${state.flags.mapSel === id ? "sel" : ""} ${placed ? "done" : ""}`;
    b.textContent = placed ? `${label} → ${placeLabel(placed)}` : label;
    b.addEventListener("click", () => {
      state.flags.mapSel = state.flags.mapSel === id ? null : id;
      openInspect(activeHotspot);
    });
    left.appendChild(b);
  });

  const right = document.createElement("div");
  right.className = "map-col";
  mapMatch.places.forEach(([id, label]) => {
    const b = document.createElement("button");
    b.className = "map-cell place";
    b.textContent = label;
    b.addEventListener("click", () => {
      if (!state.flags.mapSel) {
        setCaption("先在左边选一个座位号，再点它对应的避难点。");
        return;
      }
      state.flags.mapPairs[state.flags.mapSel] = id;
      state.flags.mapSel = null;
      checkMapMatch();
    });
    right.appendChild(b);
  });

  wrap.append(left, right);
  const hint = document.createElement("p");
  hint.className = "clue-note";
  hint.textContent = "网管手册登记残页：17→北门仓库，09→诊所，23→水塔。";
  inspectControls.append(hint, wrap);
}

function placeLabel(id) {
  const found = mapMatch.places.find((p) => p[0] === id);
  return found ? found[1] : id;
}

function checkMapMatch() {
  const pairs = state.flags.mapPairs;
  const keys = Object.keys(pairs);
  if (keys.length < mapMatch.seats.length) {
    openInspect(activeHotspot);
    return;
  }
  const correct = mapMatch.seats.every(([id]) => pairs[id] === mapMatch.answer[id]);
  if (!correct) {
    flash();
    setCaption("对应不上。手册登记残页：17→北门仓库，09→诊所，23→水塔。");
    state.flags.mapPairs = {};
    state.flags.mapSel = null;
    openInspect(activeHotspot);
    return;
  }
  mapPuzzle();
}

function renderServerControls() {
  const panel = document.createElement("div");
  panel.className = `server-panel ${state.flags.serverOn ? "online" : ""}`;
  panel.innerHTML = `<span></span><span></span><span></span><p>${state.flags.serverOn ? "LOCAL ARCHIVE READY" : (state.flags.networkDone ? "POWER REQUIRED" : "NO NETWORK")}</p>`;
  inspectControls.appendChild(panel);

  const crank = document.createElement("button");
  crank.className = "inspect-action";
  crank.textContent = state.flags.serverOn ? "服务器已启动" : "接上手摇柄，启动服务器";
  crank.disabled = state.flags.serverOn;
  crank.addEventListener("click", () => {
    if (!has("handle")) {
      setCaption("应急电源缺少摇柄。手摇柄在机房老周的储物柜里。");
      return;
    }
    if (!state.flags.networkDone) {
      setCaption("服务器亮了一瞬又熄灭：未检测到本地网络拓扑。先接好交换机。");
      flash();
      return;
    }
    playObjectAction("server");
    powerServer();
  });

  const usb = document.createElement("button");
  usb.className = "inspect-action";
  usb.textContent = "插入 U 盘";
  usb.addEventListener("click", () => {
    if (!has("drive")) {
      setCaption("接口旁有一个长方形空痕，像在等某种小型存储器。U 盘在机房地上。");
      return;
    }
    if (!state.flags.serverOn) {
      setCaption("U 盘插上去了，但服务器还没有稳定供电。先把电摇满。");
      return;
    }
    openArchiveBoard();
  });

  inspectControls.append(crank, usb);
}

function openArchiveBoard() {
  openInspect({
    title: "2012 预警档案 · 重读",
    art: "art-server",
    text: "服务器要求先核对：当年这些日常异常，到底是故障，还是预警。把每件旧物重新读一遍。",
    controls: "archive",
  });
  queueDialogue(solveBeats.archiveOpen);
}

function renderArchiveControls() {
  const missing = archiveCards.filter((c) => !has(c.need));
  if (missing.length) {
    const note = document.createElement("p");
    note.className = "clue-note";
    note.textContent = `还有异常没被带回来：${missing.map((c) => items[c.need].name).join("、")}。先把它们找齐，再读档案。`;
    inspectControls.appendChild(note);
    return;
  }

  const board = document.createElement("div");
  board.className = "clue-board";
  archiveCards.forEach((card) => {
    const row = document.createElement("div");
    row.className = "clue-card";
    const q = document.createElement("p");
    q.className = "clue-q";
    q.textContent = card.q;
    row.appendChild(q);

    const opts = document.createElement("div");
    opts.className = "clue-opts";
    card.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = `clue-opt ${state.flags.archiveAnswers[card.id] === i ? "picked" : ""}`;
      b.textContent = opt.text;
      b.addEventListener("click", () => {
        state.flags.archiveAnswers[card.id] = i;
        opts.querySelectorAll(".clue-opt").forEach((el, idx) => {
          el.classList.toggle("picked", idx === i);
        });
      });
      opts.appendChild(b);
    });
    row.appendChild(opts);
    board.appendChild(row);
  });
  inspectControls.appendChild(board);

  const submit = document.createElement("button");
  submit.className = "inspect-action";
  submit.textContent = "提交重读";
  submit.addEventListener("click", () => {
    const allAnswered = archiveCards.every((c) => state.flags.archiveAnswers[c.id] != null);
    if (!allAnswered) {
      setCaption("还有异常没给出判断。每一件都要选。");
      return;
    }
    const allCorrect = archiveCards.every((c) => c.options[state.flags.archiveAnswers[c.id]]?.correct);
    if (!allCorrect) {
      flash();
      setCaption("有几条还是被读成了故障。再想想哪些其实是预警，哪些只是旧物。");
      queueDialogue([["archivist", "再想想。当年的人，就是这样把它一条条划掉的。"]]);
      return;
    }
    state.flags.archiveSolved = true;
    success();
    restoreArchive();
  });
  inspectControls.appendChild(submit);
}

function mapPuzzle() {
  state.flags.mapDone = true;
  state.flags.mapSel = null;
  playObjectAction("map");
  success();
  take("map", "你把座位号和避难点对上：17 号不是座位，是北门仓库。地图角落浮出抢修顺序。", solveBeats.map);
}

function networkPuzzle() {
  if (!state.flags.mapDone) {
    setCaption("颜色对应地点，但顺序还对不上。先把地图的抢修先后读出来。");
    return;
  }
  state.flags.networkDone = true;
  success();
  take("network", "你按北门、水塔、诊所、星河接回线缆。离线拓扑亮起：星河、北门、水塔、诊所。", solveBeats.network);
}

function powerServer() {
  if (!state.flags.networkDone) {
    setCaption("服务器亮了一瞬又熄灭：未检测到本地网络拓扑。");
    return;
  }
  state.flags.serverOn = true;
  success();
  closeInspect();
  setCaption("你摇动手柄，服务器灯次第亮起，像在黑暗里重新学会呼吸。现在可以插入 U 盘。");
  queueDialogue(solveBeats.server);
  render();
}

function restoreArchive() {
  if (!state.flags.serverOn || !state.flags.archiveSolved) {
    setCaption("档案还没准备好。");
    return;
  }
  showEnding();
}

// 全屏黑场结局，取代旧的 scene-ending 光晕场景。
function showEnding() {
  closeInspect();
  dialogueEl.classList.add("hidden");
  setDialogueLock(false);

  endingBody.textContent =
    "预警抵达过。它藏在小票的时间戳、读卡器的报错、路由器的杂讯里。大多数人把它当成机器坏了——老周没能让他们相信，他自己也没撑过那一夜。但有一个人信了：阿丁回了家，活了下来，把这间网吧接成了之后所有幸存者的中转站。问题从来不是世界没出声，而是要在噪音里听见那一个真的在喊的声音——并且，至少做那个听见的人。";

  const relics = state.inventory.length;
  endingStats.innerHTML = `
    <div>封存遗物 · ${relics} 件</div>
    <div>重读为预警的异常 · 7 / 7</div>
    <div>听懂警报并活下来的人 · 阿丁</div>`;

  endingScreen.classList.remove("hidden");
  endingScreen.setAttribute("aria-hidden", "false");
}

function hideEnding() {
  endingScreen.classList.add("hidden");
  endingScreen.setAttribute("aria-hidden", "true");
}

function closeInspect() {
  inspect.classList.add("hidden");
}

function showNotes() {
  openInspect({
    title: "考古札记",
    art: "art-photo",
    text: "线索：那一夜守前台的网管老周，发现了异常（小票、读卡器、路由器），想警告大家，没人信。常客阿丁信了，回了家、活了下来。一边修复设备（代币、会员卡、17 号机、储物柜、接线、供电），一边收集日常异常，最后在服务器前把它们重新读成预警，就能读出老周和阿丁的结局。",
  });
}

function currentObjective() {
  if (!has("coin")) return "外墙：翻瓦砾，找到能启动前台机关的圆形代币。";
  if (!has("router")) return "外墙：墙上还有一个黑色盒子（路由器），后面接局域网要用。";
  if (!has("card")) return "前台：检查收银机近景，把代币塞入投币槽，取得会员卡。";
  if (!has("photo")) return "前台：用会员卡刷开失物箱，取得合影照片（背面有字）。";
  if (!has("ticket") || !has("idcopy") || !has("noodle")) return "前台：把小票、身份证复印件、半桶泡面这些异常都收走，结局要用。";
  if (!has("drive")) return "机房：地上有一个 U 盘，先捡起来。";
  if (!state.flags.passwordKnown) return "机房：用会员卡唤醒 17 号机，屏幕会留下残缺密码 H_M_。";
  if (!state.flags.lockerOpen) return "机房：储物柜是四位字母锁。用 17 号机的 H_M_ 加上合影背面的字母，凑成 HOME。";
  if (!has("keyboard")) return "机房：别忘了取走掉了 W 键的键盘，它也是一条异常。";
  if (!state.flags.mapDone) return "管理员小屋：用合影和网管手册，把座位号匹配到避难点，读出抢修顺序。";
  if (!state.flags.networkDone) return "管理员小屋：接交换机。颜色看机房涂鸦，顺序看地图：北门、水塔、诊所、星河。";
  if (!state.flags.serverOn) return "管理员小屋：接上手摇柄启动服务器（需先接好局域网）。";
  if (!has("earspoon")) return "管理员小屋：桌上那枚掏耳勺也带上——结局会考你怎么读它。";
  if (!state.flags.archiveSolved) return "管理员小屋：插入 U 盘，打开线索板，把每件异常重新读成‘故障’还是‘预警’。";
  return "章节目标已完成。读取 2012 预警档案，确认星河网吧的真实用途。";
}

function showObjective() {
  openInspect({
    title: "当前目标",
    art: "art-map",
    text: currentObjective(),
  });
}

function resetGame() {
  state.scene = "entrance";
  state.selected = null;
  state.inventory = [];
  state.flags = {
    plaque: false,
    cashierOpen: false,
    photoFound: false,
    passwordKnown: false,
    lockerOpen: false,
    mapDone: false,
    wireSequence: "",
    lockLetters: ["A", "A", "A", "A"],
    mapPairs: {},
    mapSel: null,
    serverCranked: 0,
    networkDone: false,
    serverOn: false,
    archiveAnswers: {},
    archiveSolved: false,
    chairSampled: false,
  };
  closeInspect();
  setCaption(scenes.entrance.enter);
  render();
}

leftArrow.addEventListener("click", () => {
  const index = order.indexOf(state.scene);
  if (index > 0) go(order[index - 1]);
});

rightArrow.addEventListener("click", () => {
  const index = order.indexOf(state.scene);
  if (index >= 0 && index < order.length - 1) go(order[index + 1]);
});

dialogueBlocker.addEventListener("click", nextDialogue);
document.getElementById("closeInspect").addEventListener("click", closeInspect);
const settingsToggle = document.getElementById("settingsToggle");
const settingsMenu = document.getElementById("settingsMenu");
function closeSettings() {
  settingsMenu.classList.add("hidden");
  settingsToggle.setAttribute("aria-expanded", "false");
}
settingsToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  const opened = settingsMenu.classList.toggle("hidden");
  settingsToggle.setAttribute("aria-expanded", opened ? "false" : "true");
});
settingsMenu.addEventListener("click", (event) => event.stopPropagation());
document.addEventListener("click", closeSettings);
document.getElementById("noteBtn").addEventListener("click", () => { closeSettings(); showNotes(); });
document.getElementById("objectiveBtn").addEventListener("click", () => { closeSettings(); showObjective(); });
document.getElementById("resetBtn").addEventListener("click", () => { closeSettings(); resetGame(); });
dialogueEl.addEventListener("click", nextDialogue);
endingRestart.addEventListener("click", () => {
  hideEnding();
  resetGame();
});
const soundBtn = document.getElementById("soundBtn");
if (soundBtn) soundBtn.addEventListener("click", () => {
  setSound(!soundOn);
  closeSettings();
});
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("titleScreen").classList.add("hidden");
  startBgm();
  setCaption("任务：确认“星河网吧”遗迹的真实用途。先观察外墙，旧人留下的维修字往往比传说可靠。");
  queueDialogue([
    ["lead", "进入遗迹。不要急着解释，先让物件自己说话。"],
    ["tech", "我会盯着设备残留信号。能通电的东西，都可能保存过异常。"],
    ["archivist", "我负责把你们的误读写得稍微像学术成果。我们边走边对线索。"],
  ]);
});
inspect.addEventListener("click", (event) => {
  if (event.target === inspect) closeInspect();
});

setCaption(scenes.entrance.enter);
render();
