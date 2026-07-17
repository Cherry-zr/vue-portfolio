export const projects = [
  {
    slug: "city-party-platform",
    title: "同城活动发现与陌生人组局平台",
    subtitle: "主项目 · Vue 3 全栈业务平台",
    status: "完整项目 · 本地演示 · 公开源码",
    role: "个人独立完成，前端主导并完成全栈实现",
    summary:
      "面向同城线下社交场景的活动发现与陌生人组局平台，覆盖活动发布、地图浏览、报名候补、实时群聊、互评信用和管理员运营分析等完整业务流程。",
    description:
      "项目采用 Vue 3 与 Spring Boot 构建，前端同时包含移动端用户页面和管理员后台，通过 REST API、WebSocket 与高德地图完成复杂业务交互，并配套自动化测试、Docker Compose、CI 和安全扫描。",
    techStack: [
      "Vue 3",
      "JavaScript",
      "Vite",
      "Vue Router",
      "Pinia",
      "Axios",
      "Vant",
      "Element Plus",
      "ECharts",
      "WebSocket",
      "高德地图 JS API",
      "Spring Boot",
      "MyBatis-Plus",
      "MySQL",
      "Redis",
      "JWT",
      "Docker Compose",
      "GitHub Actions",
      "Playwright"
    ],
    features: [
      "活动列表、详情、发布、编辑、取消和结束等生命周期管理",
      "基于高德地图的附近活动浏览、位置选择和距离筛选",
      "报名审核、退出、候补队列与候补转正流程",
      "基于 WebSocket 的活动群聊、系统通知和未读状态",
      "活动结束后的用户互评、信用记录和信用分更新",
      "管理员后台的用户、活动、报名、评价和信用管理",
      "基于 ECharts 的运营概览、趋势、分布、质量指标和热门活动排行",
      "loading、empty、error、retry 和登录失效等页面状态处理",
      "Docker Compose、自动化测试、CI 与密钥扫描等工程化交付"
    ],
    challenges: [
      {
        title: "报名并发与候补一致性",
        solution:
          "通过数据库唯一约束避免同一用户重复报名，使用条件更新控制活动名额；Redis List 维护候补顺序，MySQL 保存最终业务状态，Redis 不可用时回退查询最早的 WAITING 记录。"
      },
      {
        title: "实时群聊与身份校验",
        solution:
          "WebSocket 握手阶段校验 JWT 并复核数据库用户状态，发送消息前再次检查活动发起人或已通过报名成员身份，消息持久化后仅向有权限的在线成员广播。"
      },
      {
        title: "地图页面与异步状态",
        solution:
          "统一处理地图脚本加载、浏览器定位、默认城市降级、附近活动查询和距离筛选，并为地图与列表分别提供加载、空数据、失败提示和重试状态。"
      },
      {
        title: "管理员数据看板",
        solution:
          "为多种时间范围定义统一指标口径，趋势和分布接口补齐空日期并处理除零；前端使用 ECharts 展示数据，同时覆盖 loading、empty、error 和 retry 状态。"
      }
    ],
    screenshots: [
      { title: "移动端活动首页", src: "assets/city-party/home.png" },
      { title: "附近活动地图与距离筛选", src: "assets/city-party/map.png" },
      { title: "报名与候补流程", src: "assets/city-party/waitlist.png" },
      { title: "WebSocket 活动群聊", src: "assets/city-party/chat.png" },
      { title: "管理员运营概览", src: "assets/city-party/admin-overview.png" },
      { title: "管理员数据分析", src: "assets/city-party/admin-analytics.png" }
    ],
    quality: [
      "后端测试：85 项通过，失败 0、错误 0、跳过 0",
      "前端生产构建：npm ci 与 npm run build 通过",
      "Playwright：2 个冒烟用例通过，失败 0",
      "Docker Compose：配置检查和空数据卷初始化通过",
      "GitHub Actions：CI 与 Security Scan 成功，Gitleaks 最终验收未发现泄漏"
    ],
    githubUrl: "https://github.com/Cherry-zr/city-party-platform",
    highlight: true
  },
  {
    slug: "campus-market",
    title: "校园二手交易平台",
    subtitle: "早期全栈项目 · 静态 Demo",
    status: "早期项目 · 静态 Demo",
    role: "前端与全栈功能实现",
    summary: "面向校园场景的二手物品交易平台，覆盖商品发布、搜索分类、详情浏览、订单、收藏、聊天和后台审核等流程。",
    description:
      "项目原型为 Vue3 + Spring Boot + MySQL 全栈系统，是早期全栈实践。作品集中的在线 Demo 使用本地 mock 数据复现核心前端流程，可在 GitHub Pages 中静态展示，不依赖真实后端接口。",
    techStack: ["Vue3", "Vite", "Vue Router", "Pinia", "Axios", "Element Plus", "Spring Boot", "MyBatis Plus", "MySQL", "Redis", "JWT", "WebSocket", "MinIO", "Docker", "Nginx"],
    features: ["商品列表、搜索和分类筛选", "商品详情、收藏和模拟下单流程", "发布商品、登录注册和个人中心展示", "聊天、订单和后台审核的业务设计", "GitHub Pages 静态 mock 演示"],
    challenges: [
      {
        title: "静态站点无法依赖真实后端",
        solution: "将核心交易流程抽象成本地 mock 数据和 Pinia 状态，保证 Demo 可访问、可点击、可讲解。"
      },
      {
        title: "业务模块较多，面试展示容易分散",
        solution: "把商品浏览、发布、个人中心作为主线，其余订单、聊天、审核作为项目详情中的扩展能力说明。"
      }
    ],
    screenshots: [
      { title: "首页与商品列表", src: "assets/campus/home.png" },
      { title: "商品详情", src: "assets/campus/goods-detail.png" },
      { title: "发布商品", src: "assets/campus/publish.png" },
      { title: "订单管理", src: "assets/campus/orders.png" },
      { title: "消息中心", src: "assets/campus/chat.png" },
      { title: "管理后台", src: "assets/campus/admin.png" }
    ],
    demoRoute: "/demo/campus-market",
    highlight: false
  },
  {
    slug: "hotel-management",
    title: "LuxeStay 酒店管理系统",
    subtitle: "Java Web · 本地源码项目",
    status: "本地源码项目 · 静态展示",
    role: "后端业务与 JSP 管理页面实现",
    summary: "基于 SSM 的酒店后台管理系统，覆盖房间、房型、预订、住客、商品库存、服务记录和退房结算等模块。",
    description:
      "项目使用 Spring MVC、Spring、MyBatis、JSP 和 MySQL 完成传统 Java Web 后台业务。作品集展示其管理页面截图、核心业务模块和静态页面。",
    techStack: ["Java", "Spring MVC", "Spring", "MyBatis", "JSP", "JSTL", "MySQL", "Maven", "Jetty"],
    features: ["用户登录与后台工作台", "房间与房型维护", "预订和住客资料管理", "商品库存和服务记录", "退房结算与充值明细"],
    challenges: [
      {
        title: "传统 JSP 项目页面和业务耦合明显",
        solution: "按 Controller、Service、Mapper、JSP 页面梳理模块边界，优先保证业务流程清楚可运行。"
      },
      {
        title: "本地演示依赖 MySQL 初始化数据",
        solution: "提供数据库初始化脚本和启动说明，降低环境恢复和面试演示成本。"
      }
    ],
    screenshots: [
      { title: "登录页", src: "assets/hotel/login.png" },
      { title: "后台工作台", src: "assets/hotel/dashboard.png" },
      { title: "房间管理", src: "assets/hotel/rooms.png" },
      { title: "商品管理", src: "assets/hotel/products.png" }
    ],
    demoRoute: "/demo/hotel"
  },
  {
    slug: "movie-rating-analysis",
    title: "电影评分数据分析与可视化",
    subtitle: "Python · 数据分析项目",
    status: "数据分析项目 · 静态展示",
    role: "数据清洗、统计分析和报告生成",
    summary: "基于 MovieLens 和 IMDb 数据完成电影评分统计、用户行为分析、图表生成和 Word 报告输出。",
    description:
      "项目使用 Pandas、NumPy、Matplotlib 和 python-docx 组织完整数据分析流程，输出 CSV 结果表、PNG 图表和课程报告。",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "python-docx", "MovieLens", "IMDb", "unittest"],
    features: ["MovieLens 数据读取与字段校验", "缺失值、重复值和年份字段清洗", "评分分布、类型评分、热门电影和用户活跃度分析", "IMDb 外部数据关联分析", "自动生成图表、CSV 结果和 Word 报告"],
    challenges: [
      {
        title: "数据来源多且字段格式不一致",
        solution: "在 data_loader 与 data_cleaning 中做字段校验、类型转换和异常提示，保证分析入口稳定。"
      },
      {
        title: "中文图表和 Word 报告排版容易出错",
        solution: "统一字体候选、图表尺寸、报告模板和自动化测试，减少跨环境排版问题。"
      }
    ],
    screenshots: [
      { title: "评分分布", src: "assets/movie/rating_distribution.png" },
      { title: "类型平均评分", src: "assets/movie/genre_average_ratings.png" },
      { title: "评分热力图", src: "assets/movie/rating_weekday_hour_heatmap.png" },
      { title: "IMDb 对比分析", src: "assets/movie/imdb_comparison.png" }
    ],
    demoRoute: "/demo/movie-analysis"
  }
];
