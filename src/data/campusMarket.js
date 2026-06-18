export const campusCategories = ["全部", "数码", "书籍", "生活", "运动", "文具"];

export const campusGoods = [
  {
    id: "keyboard",
    title: "机械键盘 青轴",
    category: "数码",
    price: 120,
    condition: "九成新",
    seller: "李同学",
    location: "信息楼",
    postedAt: "2 小时前",
    description: "自用机械键盘，按键正常，适合宿舍学习和开发使用。",
    features: ["支持校园内面交", "键帽完整", "适合编程输入"],
    status: "在售"
  },
  {
    id: "backpack",
    title: "双肩包 九成新",
    category: "生活",
    price: 60,
    condition: "九成新",
    seller: "王同学",
    location: "图书馆",
    postedAt: "1 天前",
    description: "容量较大，可放电脑和书本，适合通勤或上课使用。",
    features: ["容量充足", "拉链顺滑", "外观简洁"],
    status: "在售"
  },
  {
    id: "basketball",
    title: "篮球 七成新",
    category: "运动",
    price: 40,
    condition: "七成新",
    seller: "张同学",
    location: "东操场",
    postedAt: "2 天前",
    description: "日常训练使用，弹性正常，适合课余运动。",
    features: ["手感稳定", "适合室外场地", "可议价"],
    status: "在售"
  },
  {
    id: "book",
    title: "JavaScript 高级程序设计",
    category: "书籍",
    price: 35,
    condition: "八成新",
    seller: "陈同学",
    location: "宿舍区",
    postedAt: "3 天前",
    description: "前端基础进阶书籍，有少量笔记，不影响阅读。",
    features: ["前端学习", "有重点标注", "适合自学"],
    status: "在售"
  },
  {
    id: "lamp",
    title: "护眼台灯",
    category: "生活",
    price: 50,
    condition: "九成新",
    seller: "赵同学",
    location: "西区宿舍",
    postedAt: "4 天前",
    description: "亮度可调，适合晚间阅读和写代码。",
    features: ["亮度可调", "体积小", "适合宿舍"],
    status: "在售"
  },
  {
    id: "notebook",
    title: "A5 笔记本套装",
    category: "文具",
    price: 18,
    condition: "全新",
    seller: "刘同学",
    location: "教学楼",
    postedAt: "5 天前",
    description: "未拆封笔记本和便签组合，适合课堂记录。",
    features: ["全新未拆", "轻便", "适合学习"],
    status: "在售"
  }
];

export const campusProfile = {
  nickname: "李同学",
  role: "普通会员",
  published: 12,
  favorites: 8,
  views: 56,
  menus: ["我的发布", "我的收藏", "浏览记录", "账号设置"]
};

export const campusMessages = [
  { from: "seller", text: "你好，键盘还在，可以在信息楼附近面交。" },
  { from: "me", text: "可以，我下午 4 点左右过去看一下。" },
  { from: "seller", text: "没问题，我会提前带过去。" }
];
