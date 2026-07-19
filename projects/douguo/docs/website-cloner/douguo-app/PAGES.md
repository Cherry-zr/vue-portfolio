# 豆果美食移动端复刻页面清单

## 已纳入

- `/home`：关注、推荐、笔记、视频、活动频道。
- `/categories`：服务端多级菜谱分类。
- `/search`：热门搜索、搜索建议、关键词搜索、排序切换。
- `/detail/:id?type=recipe|note`：菜谱详情与笔记详情。
- `/recipe/:id/related`：菜谱相关信息、评论预览和学做笔记。
- `/recipe/:id/comments`：菜谱评论分页列表。
- `/recipe/:id/learned`：学做笔记分页列表。
- `/recipe/:id/material/:name`：食材详情入口与接口状态。
- `/recipe/:id/nutrient`：营养分析入口与接口状态。
- `/topics`：热门话题列表。
- `/topic/:id`：话题详情与笔记分页列表。
- `/note/:id/related`：相关笔记分页列表。
- `/user/:id`：公开用户资料、菜谱、笔记和收藏。
- `/user/:id/calendar`：公开用户日历。
- `/mine`：无登录接口时的禁用说明。
- `/nutrition`（兼容 `/dietail`）：AI 营养师能力限制说明。
- `/login`：登录能力限制说明，不收集凭据。

全局配置与初始化配置没有独立页面，只作为应用启动能力验证。

## 明确排除

- 真实登录、注册、找回密码与凭据收集。
- 发布菜谱、发布笔记、真实点赞、关注、评论和收藏写入。
- 真实 AI 对话、商城、支付、钱包、采购清单、课程购买和会员能力。
- 原 App 的私有接口、认证会话、WebView 私有页面和任何访问控制绕过。

## 当前接口限制

- `app/config.json` 当前返回未找到。
- `home/videos`、`recipe/material`、`recipe/nutrient` 当前可能返回空响应。
- `user/info` 与部分 `recipe/detail` 请求当前可能返回签名验证失败。
- 受限页面保留真实错误、重试和能力说明，不填充虚构业务数据。
