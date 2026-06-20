export const campusCategories = ["全部", "数码设备", "教材资料", "宿舍生活", "运动户外", "票券周边"];

export const campusGoods = [
  {
    id: "keyboard",
    title: "九成新 iPad 10.2",
    category: "数码设备",
    categoryLabel: "数码设备",
    price: 1899,
    condition: "九成新",
    seller: "林同学",
    location: "图书馆东门",
    postedAt: "2 小时前",
    description: "平时主要用来做课堂笔记，屏幕和机身保护良好，附带保护壳，建议图书馆或教学楼附近当面交易。",
    features: ["支持校园内面交", "附保护壳", "适合课堂笔记"],
    status: "在售",
    statusCode: "ON_SALE",
    image: "assets/campus/goods-detail.png"
  },
  {
    id: "backpack",
    title: "计算机网络教材套装",
    category: "教材资料",
    categoryLabel: "教材资料",
    price: 68,
    condition: "八成新",
    seller: "周同学",
    location: "图书馆",
    postedAt: "1 天前",
    description: "计算机网络课程教材和习题册一套，重点章节有少量标注，适合期末复习和课程预习。",
    features: ["教材资料", "有重点标注", "适合复习"],
    status: "在售",
    statusCode: "ON_SALE",
    image: "assets/campus/home.png"
  },
  {
    id: "basketball",
    title: "羽毛球拍和护腕",
    category: "运动户外",
    categoryLabel: "运动户外",
    price: 89,
    condition: "八成新",
    seller: "陈同学",
    location: "体育馆南门",
    postedAt: "2 天前",
    description: "球拍线还比较新，护腕清洗后保存，适合体育课和社团训练，价格可小刀。",
    features: ["运动社团", "手感稳定", "可议价"],
    status: "在售",
    statusCode: "ON_SALE",
    image: "assets/campus/home.png"
  },
  {
    id: "book",
    title: "宿舍小台灯",
    category: "宿舍生活",
    categoryLabel: "宿舍生活",
    price: 35,
    condition: "九成新",
    seller: "王同学",
    location: "西区宿舍",
    postedAt: "3 天前",
    description: "三档亮度调节，晚上看书写作业够用，毕业搬宿舍出闲置。",
    features: ["亮度可调", "宿舍可用", "小件好面交"],
    status: "待审核",
    statusCode: "PENDING",
    image: "assets/campus/home.png"
  },
  {
    id: "lamp",
    title: "二手山地车",
    category: "运动户外",
    categoryLabel: "运动户外",
    price: 320,
    condition: "七成新",
    seller: "赵同学",
    location: "东操场",
    postedAt: "4 天前",
    description: "日常校内通勤使用，刹车正常，车铃和脚撑可用，建议现场试骑后交易。",
    features: ["校内通勤", "可现场试骑", "价格可谈"],
    status: "待审核",
    statusCode: "PENDING",
    image: "assets/campus/admin.png"
  },
  {
    id: "notebook",
    title: "校园演唱会票",
    category: "票券周边",
    categoryLabel: "票券周边",
    price: 45,
    condition: "全新",
    seller: "刘同学",
    location: "教学楼 A 区",
    postedAt: "5 天前",
    description: "临时有课去不了，原价转让，支持现场核验票面信息后交易。",
    features: ["票券周边", "可现场核验", "原价转让"],
    status: "在售",
    statusCode: "ON_SALE",
    image: "assets/campus/orders.png"
  }
];

export const campusProfile = {
  nickname: "林同学",
  role: "普通会员 · 已完成校园认证",
  published: 12,
  favorites: 8,
  views: 56,
  orders: 3,
  menus: ["我的发布", "我的收藏", "浏览记录", "账号设置"]
};

export const campusMessages = [
  { from: "seller", name: "周同学", text: "你好，计算机网络教材还在吗？" },
  { from: "me", name: "我", text: "还在，教材和习题册都保存得很好。" },
  { from: "seller", name: "周同学", text: "我今晚 7 点可以在图书馆门口取。" },
  { from: "me", name: "我", text: "可以，我会提前带过去。" }
];

export const campusOrders = [
  { id: "CM20260602001", title: "九成新 iPad 10.2", amount: 1899, status: "待支付" },
  { id: "CM20260602002", title: "计算机网络教材套装", amount: 68, status: "已支付" },
  { id: "CM20260602003", title: "宿舍小台灯", amount: 35, status: "已完成" }
];
