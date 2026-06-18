# Vue Portfolio

一个用于 Web 前端实习面试展示的黑白极简个人作品展示站。项目使用 Vue3 + Vite + Vue Router + Pinia 构建，重点展示个人信息、技术栈、项目经验和静态 Demo。

## 项目特点

- 黑白灰极简视觉风格，参考现代作品集网站、简历网站、Apple 官网式留白和 Notion 式排版。
- 首页采用左右分栏布局，突出主项目“校园二手交易平台”。
- 不接入真实后端，不使用数据库，GitHub Pages 上展示静态 mock 数据。
- 不展示手机号，不提供 PDF 简历下载，网站主要用于作品展示。
- 路由使用 hash 模式，避免 GitHub Pages 刷新 404。

## 技术栈

- Vue3
- Vite
- Vue Router
- Pinia
- 原生 CSS

## 页面

- 首页：个人介绍、求职方向、核心技术栈、主项目预览
- 关于我：教育背景占位、个人简介、求职方向
- 技能栈：前端、后端、数据库、工具分类展示
- 项目展示：校园二手交易平台、LuxeStay 酒店管理系统、电影评分数据分析与可视化
- 项目详情：项目介绍、技术栈、功能模块、难点与解决方案、截图区域、Demo 链接
- 联系方式：GitHub 与邮箱占位

## 本地运行

环境建议：

- Node.js 24 或更高版本
- npm 11 或更高版本

请在项目根目录执行：

```powershell
cd D:\GitHub_code\vue_show
npm install
npm run dev
```

默认访问地址：

```text
http://localhost:5173/
```

## 构建

```powershell
npm run build
```

构建产物在：

```text
dist
```

## GitHub Pages 部署

当前仓库计划部署到：

```text
https://cherry-zr.github.io/vue-portfolio/
```

因此 `vite.config.js` 已配置：

```js
base: "/vue-portfolio/"
```

部署方式：

1. 将本项目推送到 `https://github.com/Cherry-zr/vue-portfolio`
2. 进入 GitHub 仓库 Settings
3. 打开 Pages
4. Source 选择 GitHub Actions
5. 推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并部署

## 原项目说明

作品集内容参考了本机项目源码，但不会修改原项目：

- 校园二手交易平台：`D:\codex\campus-market-2026-github`
- 酒店管理系统：`D:\web_last\hotel`
- Python 电影评分数据分析：`D:\last_python\movie_rating_analysis`

## 推荐提交信息

```text
feat: create minimalist project portfolio site
```
