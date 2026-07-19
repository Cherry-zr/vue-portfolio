# 组件清单

## 复用

- `MainSwipeLayout`：四个主页面的状态保持和横向手势。
- `AppTabbar`：首页、分类、话题、我的及禁用发布入口。
- `FoodWaterfall`：菜谱、笔记和视频搜索结果。
- `PendingState`：空状态、错误、接口限制和重试。
- `SideDrawer`：仅保留分类、话题和无接口功能说明入口。
- `HomeCarousel`：授权的现有本地横幅。

## 新增

- `PageHeader`：深层页面统一返回标题栏。
- `CommentList`：评论作者、内容、时间和只读互动状态。
- `TopicCard`：话题封面、名称、描述和内容数量。
- `UserContentTabs`：公开用户菜谱、笔记、收藏切换。
- `DisabledActionBar`：点赞、关注、收藏、发布等只读说明。

## 页面状态

所有数据页必须具备加载、成功、空、失败、分页失败与图片失败状态。
