# AGENTS.md — Hosuke/mandala（金胎不二・兩部曼荼羅引擎）

Codex 只读本档（不读 CLAUDE.md）。在目标仓库 clone 内按 goal 施工，止于 commit；push/PR 由 foreman 负责。

## 项目
纯前端静态站点：vanilla ES modules，**无构建步骤、无 npm/打包器**，WebGL/Canvas 渲染两部曼荼罗。部署 main → gh-pages。
- 入口 `index.html`；逻辑 `js/*.js`（main/camera/anim/layout/traversal/samaya3d/textures/card/ui/bell/goso）
- 数据 `js/data/*.js`（deities/genten/siddham/courts/kodo/i18n）；资源 `assets/`；第三方 `vendor/`；讲义 `docs/法義講義.md`

## 自验（无 CI，必须本地跑并贴结果）
- `node --check js/*.js js/data/*.js` 语法必过
- 视觉/交互改动：本地 host + headless 截图实测，详情框/转相刷新正常、**零控制台错误**
- 不得引入构建工具/包管理器/node_modules（.gitignore 已挡）

## 红线（违则 PR 必拒）
- 图片只入 UI chrome（`#info` / `#genten-view`）；曼荼罗 canvas 零图片；genten 模块不得被任何 canvas 路径 import。
- 只 ship CC0/已授权资源；本地参攷图走 gitignore 路径（`assets/參攷-local/`），不得入库。
- 不改既有数据模型契约（deities 的 k/t 面、bija、`gentenFor` 签名）除非 goal 明确要求。
- 不部署、不动 gh-pages。

## 不交自动化（留给人工 cc）
读图认悉昙种字、辨尊、视觉终审一类需视觉能力与判断之活**不由 Codex 执行**；此类工单会挂 `no-agent`（如 issue #1）。
