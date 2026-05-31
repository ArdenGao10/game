# 网吧考古学家 - 直接制作路线

## 目标竖切

做一个 10 分钟左右的第一章 demo：

- 4 个固定镜头场景
- 10 个可收集/可使用道具
- 3 个核心机关：会员卡读卡、HOME 字母锁、红蓝黄绿线序
- 1 个结局文档：局域网互助手册
- 风格：写实破败、末世考古、低照度、旧物细节密集

## 玩法结构

参考点击解谜游戏的制作方式：

1. 固定镜头观察场景。
2. 点击可疑物进入近景。
3. 近景里读线索、拿道具或操作机关。
4. 道具在别处二次使用。
5. 玩家回到旧场景验证新线索。
6. 最终机关打开新叙事层。

避免“点一下推进剧情”。每个关键推进都必须有可观察线索。

## 第一章场景

### 1. 坍塌外墙

功能：建立世界观，给玩家两个初始样本。

可点物：

- 褪色招牌：提示“前台代币、17 号机、路由器”。
- 瓦砾堆：取得铜色代币。
- 墙上黑盒：取得断裂路由器。

Tripo prompt:

> Realistic post-apocalyptic Chinese internet cafe storefront, collapsed concrete facade, faded red sign fragments, exposed rebar, broken glass, wet cracked tiles, hanging cables, dust and rubble, no people, dark cinematic fixed camera, game environment asset, highly detailed, realistic materials.

### 2. 前台遗址

功能：把“身份”做成谜题。

可点物：

- 价目表：解释包夜、会员、加钟。
- 收银机：投入代币，得到会员卡。
- 失物箱：刷会员卡，得到合影照片。

Tripo prompt:

> Abandoned internet cafe reception counter, old cash register, ID card reader, membership card tray, dusty lost-and-found box, peeling price board, instant noodle stains, cracked laminate desk, realistic horror puzzle game prop scene, no people.

### 3. 机房大厅

功能：主谜题核心。

可点物：

- 桌缝：取得旧 U 盘。
- 17 号机：刷会员卡，得到 HOME 提示。
- 储物柜：输入 HOME，取得手摇柄和网管手册。
- 墙面涂鸦：提示红、蓝、黄、绿线序。

Tripo prompt:

> Ruined internet cafe computer hall, rows of old monitors and keyboards, broken gaming chairs, tangled cables, locker with four-letter combination lock, wall graffiti with colored cable marks, damp concrete, dusty atmosphere, realistic fixed-camera adventure game scene.

### 4. 管理员小屋

功能：结局机关。

可点物：

- 工作日志：解释网吧灾后功能。
- 地图碎片：用合影和手册拼出避难地图。
- 交换机：用路由器，按红蓝黄绿接线。
- 离线服务器：用手摇柄供电，再插入 U 盘。

Tripo prompt:

> Small administrator office inside abandoned internet cafe, server rack, emergency hand-crank generator, network switch with colored cables, soaked paper maps on desk, old notebooks, cold daylight through cracked wall, realistic post-apocalyptic game environment, detailed props, no people.

## Unity/Godot 实现建议

### 场景组织

- `SceneNode`: 当前固定镜头背景。
- `Hotspot`: 可点击区域，包含检查文本、需要道具、给予道具、机关类型。
- `Inventory`: 道具栏状态。
- `PuzzleState`: 保存已解锁机关。
- `InspectView`: 近景检查 UI。

### 相机

先不要做自由走动。用固定镜头更适合这个体量，也更接近点击解谜：

- 左右箭头切换镜头。
- 点击热点进入近景。
- 关键机关用独立 UI 面板。

### 美术优先级

1. 先做 4 张高质量场景背景。
2. 再做 10 个道具近景图。
3. 最后做可交互机关的局部模型。

如果用 3D：

- 场景可以是真 3D，但相机固定。
- 道具近景可以用模型渲染图。
- UI 用破旧纸张、旧塑料、金属铭牌，不用现代扁平卡片。

## 下一步制作任务

1. 把网页 demo 的 4 个场景改成 4 张独立背景图。
2. 给每个道具做近景图。
3. 增加音效：雨滴、远处楼体响动、旧电流、按钮声。
4. 增加一次“错误反馈”：线序错误时屏幕闪烁。
5. 增加开始界面和通关界面。
6. 迁移到 Godot 或 Unity。
