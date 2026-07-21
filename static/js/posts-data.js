/**
 * posts-data.js — 所有文章的目录数据
 *
 * 每次新建一篇文章，只需要：
 *  1. 在 posts/ 目录下创建对应的 HTML 文件
 *  2. 在下面 posts 数组里添加一条记录
 *
 * 字段说明：
 *  id        — 唯一数字 ID，自增
 *  file      — 对应的文章文件名（放在 posts/ 目录下）
 *  title     — 文章标题
 *  tag       — 分类标签（思考 / 日常 / 生活 / 阅读 / 感悟 / 随笔…自由定义）
 *  date      — 发布日期 YYYY-MM-DD
 *  excerpt   — 摘要，显示在列表页（建议 50-80 字）
 *  readTime  — 阅读时长估算（如 "约 3 分钟"）
 *  cover     — 封面图路径（相对于 index.html），留空则显示 emoji 占位
 *  emoji     — 封面无图时的占位符号
 */
const posts = [
  {
    id: 1,
    file: "posts/post-1.html",
    title: "测试 · Pan Feng",
    tag: "日常",
    date: "2025-03-25",
    excerpt: "测试 · Pan Feng。",
    readTime: "约 2分钟",
    cover: "",
    emoji: "⌘"
  }
];