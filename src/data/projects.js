export const projects = [
  {
    slug: "campus-market",
    title: "校园二手交易平台",
    subtitle: "主项目 · 本地源码 + 静态演示",
    role: "前端与全栈功能实现",
    sourcePath: "D:\\codex\\campus-market-2026-github",
    summary: "面向校园场景的二手物品交易平台，覆盖商品发布、搜索分类、详情浏览、订单、收藏、聊天和后台审核等流程。",
    description:
      "项目原型为 Vue3 + Spring Boot + MySQL 全栈系统。作品集中的在线 Demo 使用本地 mock 数据复现核心前端流程，适合在 GitHub Pages 中静态展示，不依赖真实后端接口。",
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
    screenshots: [],
    demoRoute: "/demo/campus-market",
    githubUrl: "",
    highlight: true
  },
  {
    slug: "hotel-management",
    title: "LuxeStay 酒店管理系统",
    subtitle: "Java Web · 本地源码项目",
    role: "后端业务与 JSP 管理页面实现",
    sourcePath: "D:\\web_last\\hotel",
    summary: "基于 SSM 的酒店后台管理系统，覆盖房间、房型、预订、住客、商品库存、服务记录和退房结算等模块。",
    description:
      "项目使用 Spring MVC、Spring、MyBatis、JSP 和 MySQL 完成传统 Java Web 后台业务。作品集展示其管理页面截图、核心业务模块和本地运行方式。",
    techStack: ["Java", "Spring MVC", "Spring", "MyBatis", "JSP", "JSTL", "MySQL", "Maven", "Jetty"],
    features: ["用户登录与后台工作台", "房间与房型维护", "预订和住客资料管理", "商品库存和服务记录", "退房结算与充值明细"],
    challenges: [
      {
        title: "传统 JSP 项目页面和业务耦合明显",
        solution: "按 Controller、Service、Mapper、JSP 页面梳理模块边界，优先保证业务流程清楚可运行。"
      },
      {
        title: "本地演示依赖 MySQL 初始化数据",
        solution: "提供 db_init.sql 和 startup.md，降低环境恢复和面试演示成本。"
      }
    ],
    screenshots: [
      { title: "登录页", src: "assets/hotel/login.png" },
      { title: "后台工作台", src: "assets/hotel/dashboard.png" },
      { title: "房间管理", src: "assets/hotel/rooms.png" },
      { title: "商品管理", src: "assets/hotel/products.png" }
    ],
    demoRoute: "/demo/hotel",
    githubUrl: ""
  },
  {
    slug: "movie-rating-analysis",
    title: "电影评分数据分析与可视化",
    subtitle: "Python · 数据分析项目",
    role: "数据清洗、统计分析和报告生成",
    sourcePath: "D:\\last_python\\movie_rating_analysis",
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
    demoRoute: "/demo/movie-analysis",
    githubUrl: ""
  }
];
