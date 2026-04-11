# Chat Bubbles for YouTube

一个用于**录制聊天打字动画**的前端工具，适合做 YouTube / Shorts / Reels 等内容中的“聊天气泡输入”片段。

- 在线地址：https://cutbypham.github.io/chat-bubbles-for-youtube/
- 技术栈：React + TypeScript + Vite + Framer Motion

---

## 产品定位

本项目聚焦于“录屏素材生产”：
- 在浏览器中输入文字，生成实时聊天气泡。
- 支持样式可视化调参，适配不同视频风格。
- 常用于 OBS、Camtasia、Premiere 等流程中的素材录制环节。

---

## 功能

### 1) 气泡样式参数
可通过右侧面板调节：
- 颜色（填充色 / 文本色 / 渐变色）
- 圆角（Border Radius）
- 透明度（Opacity）
- 边框宽度（Border Width）
- 模糊（Blur）
- 阴影强度（Shadow Intensity）
- 显示时长（Bubble Timeout）
- 聊天区背景色（建议配合抠像或透明录制流程）

### 2) 预设材质（Quick Style Presets）
内置一键预设：
- Glassmorphism
- Liquid
- Neumorphism
- Gradient

用于快速切换“材质感”，减少手动调参时间。

### 3) 面板折叠
当前版本的样式面板为右侧固定显示，便于实时调整。
如需“录制纯画面”，可使用以下方式实现折叠效果：
- 录制前将浏览器窗口裁切到聊天区域；
- 或临时通过开发者工具隐藏 `.picker` 面板；
- 或在本地二次开发中加入折叠按钮。

### 4) iMessage 形状说明（仅改形状）
如需更接近 iMessage 风格，建议优先调整**形状参数**：
- 增大圆角；
- 控制边框与阴影更柔和；
- 保持文本与背景对比清晰。

> 说明：当前实现主要是“气泡主体形状与材质风格”调整，不包含 iMessage 的完整 UI 结构复刻（如头像区、尾巴细节、消息分组逻辑等）。

---

## 快速开始

- [x] feat: add keyboard sound option (cuz not all users have great sound keyboard and mic)
-> Solution: https://github.com/hainguyents13/mechvibes

## Branch strategy

To keep this repo maintainable, use a lightweight trunk-based workflow:

- **Protected branch**: `main` (or `master` in legacy repos) should be the default branch and protected.
- **Working branch**: short-lived branches like `feature/*`, `fix/*`, `chore/*` are created from default branch.
- **Merge policy**: prefer small, frequent PRs; delete merged branches after PR completion.
- **Release**: tag releases from default branch (`vX.Y.Z`). If hotfix is needed, create `hotfix/*` from latest tag and merge back.

Branch cleanup checklist:

1. Confirm branches to keep: at minimum keep `main/master` and the active development branch.
2. Delete merged local branches first.
3. Delete corresponding remote branches.
4. If default branch must change, switch default in hosting platform first, then delete old default branch.
### 安装依赖
```bash
npm install
```

### 本地开发
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

---

## 部署说明（Vite base 路径）

本项目默认用于 GitHub Pages 子路径部署，`vite.config.ts` 中已配置：

```ts
base: '/chat-bubbles-for-youtube/'
```

如果你部署到：
- 根域名（如 `https://example.com/`），请改为 `base: '/'`；
- 其他子路径（如 `https://example.com/my-chat/`），请改为 `base: '/my-chat/'`。

> `base` 配置不匹配会导致静态资源 404（页面空白或样式/脚本加载失败）。

---

## 配置与已知限制

### 浏览器兼容
- 推荐 Chromium 内核浏览器（Chrome / Edge / Brave）。
- Firefox 可能在 `contentEditable` 输入与动画体验上存在差异，建议先进行录制前验证。

### 输入法与回车行为
- 按 `Enter` 会提交当前气泡。
- 输入法处于组合态（isComposing）时，回车用于选词，不会立即提交。
- 若需要换行，请改为多条消息分开发送（当前交互以“单条提交”为主）。

### 透明背景录制用途
- 你可以将聊天背景设置为纯色（如绿幕）后在后期抠像。
- 常见场景：叠加到游戏画面、Vlog B-roll、教程演示中。

---

## 截图

> 以下为截图占位，后续可替换为真实界面截图。

![截图占位（待更新）](./cover.jpg)

---

## License

Apache-2.0
