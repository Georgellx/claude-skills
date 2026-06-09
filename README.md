# claude-skills

我的 [Claude Code](https://claude.com/claude-code) / Claude Agent **skills 收藏**。

每个子目录是一个独立的 skill，至少包含一个 `SKILL.md`，可选 `references/`（按需加载的参考资料）、`scripts/`（可执行脚本）、`assets/`（输出用的模板等）。Claude 会根据每个 skill 的 `description` 自动判断何时调用，也可以手动 `/<skill-name>` 触发。

---

## 📦 Skills 列表

| Skill | 一句话说明 |
|---|---|
| [**self-understanding-coach**](./self-understanding-coach) | 引导式"自我认知法"教练，源自八木仁平《如何找到想做的事》——按"重要的事(价值观)→擅长的事(才能)→喜欢的事(热情)"一步步提问，帮你组合出"真正想做的事"。 |
| [**life-reset-coach**](./life-reset-coach) | 引导式"人生重启"教练，源自 Dan Koe《How to fix your entire life in 1 day》——先用"反愿景"逼出改变的能量，挖出行为背后的隐藏目标，再把目标落成一张"人生游戏地图"，用"只相信行动"逼你每天产出。 |

---

## 🧭 self-understanding-coach 详解

### 这是什么

把八木仁平《如何找到想做的事》里的"自我认知法"做成一段**多轮引导对话**。它不会直接给你答案，而是像教练一样**通过提问、倾听、反射**，帮你从自己身上挖出方向。

### 核心公式

```
喜欢的事 × 擅长的事             = 想做的事
喜欢的事 × 擅长的事 × 重要的事   = 真正想做的事
```

三大支柱：

- **重要的事（价值观 / Why）**：想以什么**状态**生活（自由地、安心地、热情地……）。人生指南针。
- **擅长的事（才能 / How）**：天生就比别人做得好、做起来不累的**方式**（深入思考、体察他人、把事讲清楚……）。不是后天学的技能知识。
- **喜欢的事（热情 / What）**：感兴趣、有好奇心的**领域**（AI、心理学、健康、棒球……）。

寻找顺序固定：**重要的事 → 擅长的事 → 喜欢的事 → 组合出"真正想做的事" → 找实现手段。**

### 它做得好的地方

- 一次只推进一步，**不会把一堆问题机械地砸给你**；
- 每收到回答**先提炼关键词、再前进**（你给碎片，它帮你拼图）；
- 主动**点破模式和矛盾**（比如"你向往的"和"你被教导的"在打架）；
- 用书里的**具体检验工具**（真假价值观、以他人→以自我、缺点→优点、兴趣vs有用），而不是空说"倾听内心"；
- 全程以**"假设"**措辞、温暖不说教。

### 何时会触发

说出类似下面的话，它会自动启动（中英文都行）：

> "不知道自己想做什么" · "对工作很迷茫" · "想转行但没方向" · "想找到自己的热爱/天赋" · "感觉像笼子里的金丝雀" · "I don't know what to do with my career" · "find my passion"

也可以直接 `/self-understanding-coach` 手动调用。

---

## 🧭 life-reset-coach 详解

### 这是什么

把 Dan Koe《How to fix your entire life in 1 day》的理论做成一段**犀利、直接、不留情面的多轮对话**（像作者本人那样）。它不哄你，而是带你先狠狠看清自己绝不想要的人生，再把改变落成可执行的行动。

### 核心信念

> **改变的不是行为，是身份。** 你不是靠意志力硬撑，而是先成为"那个会自然这么做的人"。

### 它怎么带你走

1. **反愿景**：狠狠看清你绝不想要的那种人生，逼出改变的能量；
2. **挖隐藏目标**：你的拖延 / 逃避，其实在偷偷完成某个目标（通常是"安全感"）——点破它；
3. **人生游戏地图**：把目标落成 6 个部件——反愿景 / 愿景 / 一年主线 / 一个月 Boss 战 / 每日杠杆 / 规则；
4. **只相信行动**：逼你每天产出一个"别人能看到、能反应"的东西，启动"行动→反馈→调整"的掌舵循环。

### 何时会触发

说出类似下面的话，它会自动启动（中英文都行）：

> "受够了现状" · "明明想改变却总坚持不下来" · "反复立flag又放弃" · "想重启人生" · "想被狠狠点醒" · "知道方向但卡在行动上" · "fix my life" · "reset my life"

也可以直接 `/life-reset-coach` 手动调用。

### 和 self-understanding-coach 的分工

- **self-understanding-coach（八木仁平 / ikigai）**：适合"完全不知道想做什么、要从零系统梳理价值观"。
- **life-reset-coach（Dan Koe）**：适合"已经受够现状、想被点醒并立刻把改变落成行动"。

---

## 🚀 安装与使用

把某个 skill 目录复制到你的个人 skills 目录：

- **Windows**：`C:\Users\<你>\.claude\skills\`
- **macOS / Linux**：`~/.claude/skills/`

```bash
git clone https://github.com/Georgellx/claude-skills.git
# Windows (PowerShell)
Copy-Item -Recurse claude-skills\self-understanding-coach "$env:USERPROFILE\.claude\skills\"
# macOS / Linux
cp -r claude-skills/self-understanding-coach ~/.claude/skills/
```

之后在 Claude Code 里 `/self-understanding-coach` 调用，或在相关话题下让它自动触发。

---

## ➕ 新增 skill

1. 在仓库根目录新建一个文件夹 `<your-skill>/`，写好 `SKILL.md`（含 `name` 和 `description` 两个必填的 frontmatter 字段）。
2. 在上面的"Skills 列表"里加一行。
3. 提交并推送：
   ```bash
   git add -A
   git commit -m "Add <your-skill>"
   git push
   ```

想从零做一个高质量 skill，推荐用官方的 `skill-creator`（draft → 测试 → 评审 → 迭代）。

---

## 🙏 致谢

`self-understanding-coach` 的方法论完全源自 **八木仁平《如何找到想做的事》**（徐艺菊 译，机械工业出版社）。

`life-reset-coach` 的方法论完全源自 **Dan Koe《How to fix your entire life in 1 day》**（[@thedankoe](https://x.com/thedankoe)）。

本仓库仅把上述流程整理为可复用的对话框架，强烈建议阅读原作以获得完整语境。

## 📄 License

[MIT](./LICENSE) © 2026 Georgellx
