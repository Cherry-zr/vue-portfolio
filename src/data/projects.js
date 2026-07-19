const cityPartyScreenshots = [
  {
    id: "mobile-home",
    title: "活动发现首页",
    description: "通过分类检索和本地展示封面浏览同城活动。",
    src: "assets/city-party/showcase/mobile-home.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-map",
    title: "附近活动地图",
    description: "使用高德地图展示道路、地名、活动标记和距离筛选。",
    src: "assets/city-party/showcase/mobile-map.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-activity-detail",
    title: "活动详情与报名状态",
    description: "集中展示活动信息、地图位置、名额和当前报名状态。",
    src: "assets/city-party/showcase/mobile-activity-detail.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-waitlist",
    title: "候补排队流程",
    description: "满员后进入候补队列，并明确展示候补人数和业务状态。",
    src: "assets/city-party/showcase/mobile-waitlist.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-chat",
    title: "活动实时群聊",
    description: "活动成员通过 WebSocket 沟通集合信息和活动安排。",
    src: "assets/city-party/showcase/mobile-chat.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-notices",
    title: "通知与未读状态",
    description: "展示报名、群聊和评价等系统通知及其已读状态。",
    src: "assets/city-party/showcase/mobile-notices.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "mobile-credit",
    title: "信用记录",
    description: "记录签到、报名确认和成员互评带来的信用变化。",
    src: "assets/city-party/showcase/mobile-credit.png",
    group: "mobile",
    orientation: "portrait",
    width: 430,
    height: 932
  },
  {
    id: "admin-dashboard",
    title: "管理员运营概览",
    description: "汇总概览指标、趋势、热门活动排行和业务质量指标。",
    src: "assets/city-party/showcase/admin-dashboard.png",
    group: "admin",
    orientation: "landscape",
    width: 1440,
    height: 900
  },
  {
    id: "admin-analytics",
    title: "管理员数据分析",
    description: "按时间范围查看用户、活动、报名和评价趋势。",
    src: "assets/city-party/showcase/admin-analytics.png",
    group: "admin",
    orientation: "landscape",
    width: 1440,
    height: 900
  },
  {
    id: "admin-activities",
    title: "管理员活动管理",
    description: "筛选并查看展示活动、报名和候补状态。",
    src: "assets/city-party/showcase/admin-activities.png",
    group: "admin",
    orientation: "landscape",
    width: 1440,
    height: 900
  }
];

export const projects = [
  {
    slug: "city-party-platform",
    title: "CityParty — 同城活动发现与陌生人组局平台",
    cardTitle: "CityParty",
    cardSubtitle: "同城活动发现与陌生人组局平台",
    subtitle: "主项目 · Vue 3 / Spring Boot 全栈平台",
    status: "公开源码 · 本地完整演示",
    deploymentNote: "暂未开放公网业务 Demo",
    role: "个人独立完成，前端主导并完成全栈实现",
    summary:
      "CityParty 是一个基于 Vue 3 与 Spring Boot 的同城活动组局平台，覆盖活动发现、地图浏览、报名候补、实时群聊、互评信用和管理员数据分析等业务流程。",
    description:
      "项目面向同城线下活动场景，同时提供移动端用户业务和管理员运营后台，通过 REST API、WebSocket 与高德地图连接活动发现、参与和结束后的完整互动流程。项目支持本地完整运行，当前未部署公网业务环境。",
    homeTags: ["Vue 3", "Spring Boot", "WebSocket", "地图活动", "运营看板"],
    listTags: ["Vue 3", "Spring Boot", "WebSocket", "MySQL", "Redis"],
    techStack: [
      "Vue 3",
      "Vite",
      "Vue Router",
      "Pinia",
      "Axios",
      "Vant",
      "Element Plus",
      "ECharts",
      "WebSocket",
      "高德地图 JS API",
      "Java 17",
      "Spring Boot",
      "MyBatis-Plus",
      "Maven",
      "MySQL",
      "Redis",
      "JWT",
      "PBKDF2",
      "Docker Compose",
      "GitHub Actions",
      "Gitleaks",
      "Playwright",
      "JUnit"
    ],
    techGroups: [
      { title: "用户端", items: ["Vue 3", "Vite", "Vue Router", "Pinia", "Axios", "Vant"] },
      { title: "管理后台", items: ["Vue 3", "Element Plus", "ECharts"] },
      { title: "后端", items: ["Java 17", "Spring Boot", "MyBatis-Plus", "Maven"] },
      { title: "数据与缓存", items: ["MySQL", "Redis"] },
      { title: "地图与实时通信", items: ["高德地图 JS API", "WebSocket"] },
      { title: "工程化", items: ["Playwright", "JUnit", "Docker Compose", "GitHub Actions", "Gitleaks"] }
    ],
    features: [
      "活动发现、分类检索、详情查看和地图附近活动浏览",
      "报名审核、容量控制、候补排队与候补状态展示",
      "WebSocket 活动群聊、系统通知和未读状态",
      "活动发布、编辑、取消和结束等生命周期管理",
      "活动结束后的成员互评、信用记录和信用分更新",
      "管理员概览、趋势、分布、质量指标和活动管理",
      "Docker Compose、自动化测试、CI 与密钥扫描"
    ],
    featureCards: [
      { title: "活动发现与地图浏览", description: "通过分类检索、活动详情、高德地图和距离筛选发现附近活动。" },
      { title: "活动生命周期管理", description: "覆盖活动发布、编辑、取消和结束等关键状态变化。" },
      { title: "报名审核与候补队列", description: "处理容量限制、报名审核、候补排队和候补转正流程。" },
      { title: "WebSocket 活动群聊", description: "通过身份校验后进入活动群聊，消息持久化并实时广播。" },
      { title: "通知与未读状态", description: "为报名、群聊和互评等业务事件维护系统通知与未读状态。" },
      { title: "互评与信用记录", description: "活动结束后支持成员互评，并形成可追踪的信用变化记录。" },
      { title: "管理员运营概览", description: "展示概览指标、趋势、分布、业务质量和热门活动排行。" },
      { title: "数据分析与活动管理", description: "按时间范围分析数据，并筛选查看活动、报名和候补状态。" }
    ],
    workflow: [
      "发现活动",
      "查看详情",
      "报名或候补",
      "发起人审核",
      "群聊与通知",
      "活动结束",
      "成员互评",
      "信用记录更新"
    ],
    challenges: [
      {
        title: "报名与候补一致性",
        problem: "多人同时报名时，需要降低重复报名、名额超卖和候补顺序错乱的风险。",
        solution:
          "通过数据库唯一约束和条件更新控制报名状态与活动名额；Redis 维护候补顺序，MySQL 保存最终业务状态，并在缓存不可用时回退查询最早的 WAITING 记录。",
        value: "让报名、满员和候补状态保持可追踪，并降低并发超员风险。"
      },
      {
        title: "鉴权与账号安全",
        problem: "仅校验 JWT 本身不足以反映账号被禁用或角色变化后的实时状态。",
        solution:
          "JWT 请求鉴权会继续复核数据库中的用户状态和角色；密码使用 PBKDF2，并保留旧密码摘要的升级路径。",
        value: "避免失效账号或错误角色继续访问受限业务，同时支持密码策略平滑升级。"
      },
      {
        title: "实时互动闭环",
        problem: "群聊、通知、互评和信用记录分布在活动参与的不同阶段，需要共享可靠的成员边界。",
        solution:
          "WebSocket 握手和消息发送都会校验活动成员身份；系统通知维护未读状态，活动结束后支持成员互评并形成信用记录。",
        value: "把活动开始前、进行中和结束后的互动串联为完整业务流程。"
      },
      {
        title: "管理员运营分析",
        problem: "不同时间范围和数据为空时，趋势与业务质量指标仍需保持统一口径和稳定展示。",
        solution:
          "后台统一概览、趋势、分布、质量指标和热门活动排行的数据口径，前端使用 ECharts 展示并处理空日期与除零场景。",
        value: "让管理端能够从活动规模、参与效果和业务质量多个角度查看本地展示数据。"
      },
      {
        title: "工程化与展示可靠性",
        problem: "地图、字体、封面、接口数据和 ECharts 都可能造成自动截图内容不完整或不稳定。",
        solution:
          "使用 JUnit、Playwright、Docker Compose、GitHub Actions 和 Gitleaks 完成工程验证；截图流程同时检查接口、字体、图片自然尺寸、地图标记、ECharts 画布和连续视觉稳定性。",
        value: "避免把缺图、空图表或未加载地图的页面误作为正式作品截图。"
      }
    ],
    screenshots: cityPartyScreenshots,
    showcase: {
      home: ["admin-dashboard", "mobile-home", "mobile-map"],
      list: ["admin-dashboard", "mobile-map"],
      detailHero: ["admin-dashboard", "mobile-map"]
    },
    quality: [
      { label: "后端测试", value: "94 项通过", detail: "项目最终验收记录" },
      { label: "前端生产构建", value: "通过", detail: "npm run build" },
      { label: "Playwright E2E", value: "4 项通过", detail: "现有冒烟测试" },
      { label: "展示截图门禁", value: "10 张通过", detail: "自动检查与人工复核" },
      { label: "本地环境", value: "Docker Compose", detail: "支持 MySQL / Redis" },
      { label: "CI 与安全", value: "GitHub Actions + Gitleaks", detail: "持续集成与密钥扫描" }
    ],
    limitations: [
      "暂未部署公网业务环境，作品集只提供公开源码和本地演示截图。",
      "地图功能需要开发者在本地配置自己的高德地图 Key 与安全密钥。",
      "部分扩展业务保留基础结构，当前重点展示已完成的核心活动流程。"
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
