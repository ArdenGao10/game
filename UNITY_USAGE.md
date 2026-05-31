# Unity 使用方式

当前项目还没有用 Unity。它现在是网页原型，作用是验证玩法、谜题、文案、道具链和镜头节奏。

如果迁移到 Unity，建议做成固定镜头点击解谜，而不是自由第一人称走路。这样更接近《纸嫁衣》一类游戏，也更适合 10 分钟章节。

## 推荐 Unity 项目设置

- 模板：2D URP 或 3D URP 都可以。
- 推荐：先用 2D URP。
- 分辨率：1920x1080 横屏。
- 输入：鼠标点击 / 移动端触摸都用同一套点击事件。
- 场景方式：一张背景图 + 多个透明 Hotspot + 近景 UI。

## 文件对应关系

网页原型里的内容可以这样迁移：

- `assets/scene-entrance.png` -> Unity Sprite 背景：坍塌外墙
- `assets/scene-lobby.png` -> Unity Sprite 背景：前台遗址
- `assets/scene-hall.png` -> Unity Sprite 背景：机房大厅
- `assets/scene-admin.png` -> Unity Sprite 背景：管理员小屋
- `game.js` 里的 `items` -> Unity ScriptableObject：ItemData
- `game.js` 里的 `scenes.hotspots` -> Unity ScriptableObject：SceneData / HotspotData
- `state.flags` -> Unity GameState 单例或存档数据
- `inspect` 弹窗 -> Unity Canvas：InspectPanel
- `inventory` -> Unity Canvas：InventoryBar

## Unity 场景结构

建议层级：

```text
GameRoot
  GameState
  SceneController
  AudioController
  Background
  HotspotLayer
    Hotspot_招牌
    Hotspot_收银机
    Hotspot_17号机
  UI
    CaptionBar
    InventoryBar
    InspectPanel
    PuzzlePanel
```

## 核心脚本

建议先建这些脚本：

```text
GameState.cs
SceneController.cs
Hotspot.cs
InventoryController.cs
InspectPanel.cs
PuzzleController.cs
```

### GameState

保存玩家已经拿到的道具和机关状态：

```csharp
public class GameState : MonoBehaviour
{
    public HashSet<string> items = new();
    public HashSet<string> flags = new();

    public bool HasItem(string id) => items.Contains(id);
    public void AddItem(string id) => items.Add(id);
    public bool HasFlag(string id) => flags.Contains(id);
    public void SetFlag(string id) => flags.Add(id);
}
```

### Hotspot

每个可点击物体挂一个 Hotspot：

```csharp
public class Hotspot : MonoBehaviour
{
    public string hotspotId;
    public string title;
    [TextArea] public string description;
    public string requiredItem;
    public string rewardItem;
    public string puzzleType;

    public void OnClick()
    {
        // 打开近景检查面板
    }
}
```

## 机关怎么做

### 字母锁

Unity 里做 4 个按钮组：

- 上按钮：字母 +1
- 中间 Text：当前字母
- 下按钮：字母 -1
- 当组合为 `HOME` 时触发 `lockerOpen`

### 收银机

近景面板包含：

- 投币槽图片
- 投币按钮
- 如果有 `coin`，播放抽屉打开动画
- 给 `card`

### 17 号机

近景面板包含：

- 黑屏
- 刷卡按钮
- 如果有 `card`，屏幕亮起
- 给 `password`

### 服务器

分三步：

1. 检查是否已接好局域网。
2. 摇动电源 3 次。
3. 插入 U 盘进入结局。

## 什么时候开始用 Tripo

不要一开始就全 3D 化。建议顺序：

1. 先用当前背景图做 Unity 2D 版。
2. 把所有谜题和流程跑通。
3. 再用 Tripo 生成关键近景模型，比如收银机、储物柜、服务器、路由器。
4. 用模型渲染图替换近景 UI。

这样不会被 3D 资产拖慢玩法验证。
