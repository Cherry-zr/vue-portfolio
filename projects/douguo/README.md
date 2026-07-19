# 豆果美食 UI 复刻

基于 Vue 3、TypeScript、Vite、Vue Router、Vant 和 Axios 开发。页面按提供的 App 录屏还原豆果风格，业务数据来自[豆果公开接口文档](https://apis.netstart.cn/douguo/#/)；不伪造菜谱、笔记、用户、评论或收藏数据。

## 已接入功能

- 首页：关注、推荐、笔记、视频、活动频道，下拉刷新与滚动分页。
- 搜索：热门词、搜索建议、关键词搜索、综合/最热/最新排序、菜谱/视频筛选。
- 分类：服务端多级菜谱分类，分类词可直接进入搜索。
- 详情：菜谱详情、笔记详情、相关内容、评论、学做笔记、相关笔记。
- 话题：热门话题列表、话题介绍和话题内容。
- 公开用户：用户资料、菜谱、笔记、收藏及发布日历。
- 只读状态：点赞、关注、收藏、评论、发布、私信等操作会说明禁用原因。
- 完整状态：加载骨架、空数据、超时、上游错误和重试入口。

登录和 AI 营养师提供独立说明页面，用于展示真实能力边界；项目不会模拟登录成功、生成虚假 Token、健康数据或 AI 回答。注册、商城、支付、课程和采购清单等功能没有纳入复刻范围。

## 主要页面

```text
/home
/categories
/topics
/topic/:id
/search
/detail/:id?type=recipe|note
/recipe/:id/related
/recipe/:id/comments
/recipe/:id/learned
/recipe/:id/material/:name
/recipe/:id/nutrient
/note/:id/related
/user/:id
/user/:id/calendar
/mine
/nutrition
/login
```

更完整的页面、组件和限制说明位于 `docs/website-cloner/douguo-app/`。

## 接口配置

开发环境默认请求 `/douguo-api`，由 `vite.config.ts` 代理到：

```text
https://apis.netstart.cn/douguo
```

如需修改基础路径，可复制 `.env.example` 并创建本地 `.env`：

```env
VITE_API_BASE_URL=/douguo-api
```

开发环境继续通过 Vite 代理访问接口。生产环境默认直连：

```text
https://apis.netstart.cn/douguo
```

2026-07-19 使用 GitHub Pages Origin `https://cherry-zr.github.io` 验证时，上游 GET 和 OPTIONS 响应均返回了对应的 `Access-Control-Allow-Origin`。该许可和接口可用性由第三方控制，未来发生变化时页面会显示现有错误态，不会改用不可信公共代理或虚构数据。

## 本地运行

```powershell
npm ci
npm run dev
```

默认开发地址：`http://localhost:5174`

## 构建与预览

```powershell
npm run build
npm run preview
```

生产构建的 Vite base 为 `/vue-portfolio/douguo/`，Vue Router 使用 Hash 模式；开发服务仍使用根路径和 History 模式。

## GitHub Pages

在线地址：

```text
https://cherry-zr.github.io/vue-portfolio/douguo/#/home
```

源码位于作品集仓库的 `projects/douguo` 目录，由主仓库的单一 Pages 工作流统一构建和发布。

## 已知接口限制

- `recipe/detail/:recipeid` 与 `user/info/:id` 当前可能返回“签名验证失败”，页面会保留真实错误并允许重试；用户作品列表仍可独立加载。
- `app/config.json` 当前不可用；`home/videos`、`recipe/material`、`recipe/nutrient` 当前可能返回空响应。
- 关注频道在无登录会话时可能返回空列表。
- 生产环境依赖上游允许 GitHub Pages Origin；远程接口、CORS 策略和图片可能随上游服务变化。
- 首页活动横幅包含来自参考录屏/项目素材的视觉资源，其余业务列表不使用本地数据兜底。
