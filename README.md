# claude-skills

我的 Claude Code / Claude Agent skills 收藏。每个子目录是一个独立的 skill，包含一个 `SKILL.md` 和可选的 `references/`、`scripts/`、`assets/`。

## Skills

| Skill | 说明 |
|---|---|
| [self-understanding-coach](./self-understanding-coach) | 引导式"自我认知法"教练，源自八木仁平《如何找到想做的事》。按"重要的事(价值观)→擅长的事(才能)→喜欢的事(热情)"一步步提问，帮你组合出"真正想做的事"。 |

## 安装

把某个 skill 目录复制到你的个人 skills 目录即可：

- **Windows**：`C:\Users\<你>\.claude\skills\`
- **macOS / Linux**：`~/.claude/skills/`

例如：

```bash
git clone https://github.com/Georgellx/claude-skills.git
cp -r claude-skills/self-understanding-coach ~/.claude/skills/
```

之后在 Claude Code 里输入 `/self-understanding-coach` 调用，或在相关话题下自动触发。
