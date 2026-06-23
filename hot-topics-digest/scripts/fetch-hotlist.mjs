#!/usr/bin/env node
// 抓取「微博热搜」+「抖音热榜」各前 N 条(默认 5),输出 JSON。
// 只负责拿榜单(标题/热度/标签/搜索链接) —— 免登录、稳定。
// 每个热点的「正文内容」由调用方(Claude)在触发时联网搜索补全,不在本脚本内硬爬。
//
// 用法:
//   node fetch-hotlist.mjs            # 各取前 5, 输出 JSON
//   node fetch-hotlist.mjs --top 8    # 各取前 8
//   node fetch-hotlist.mjs --pretty   # 人类可读的彩色榜单(自测用)

import https from "node:https";

const args = process.argv.slice(2);
const valOf = (f, d) => { const i = args.indexOf(f); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const TOP = Math.max(1, parseInt(valOf("--top", "5"), 10) || 5);
const PRETTY = args.includes("--pretty");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers, timeout: 20000 }, (r) => {
      const buf = [];
      r.on("data", (c) => buf.push(c));
      r.on("end", () => resolve({ status: r.statusCode, headers: r.headers, body: Buffer.concat(buf).toString("utf8") }));
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", reject);
  });
}

// 微博热搜:先访问首页拿访客 cookie,否则 ajax 接口 Forbidden
async function fetchWeibo() {
  const home = await get("https://weibo.com/", { "User-Agent": UA });
  const cookie = (home.headers["set-cookie"] || []).map((c) => c.split(";")[0]).join("; ");
  const r = await get("https://weibo.com/ajax/side/hotSearch", {
    "User-Agent": UA, "Referer": "https://weibo.com/", "Accept": "application/json", "Cookie": cookie,
  });
  const realtime = JSON.parse(r.body).data.realtime || [];
  return realtime.filter((x) => !x.is_ad).slice(0, TOP).map((x, i) => ({
    rank: i + 1,
    title: x.word,
    hot: x.num || x.raw_hot || 0,
    tag: x.label_name || x.flag_desc || "",
    search_url: "https://s.weibo.com/weibo?q=" + encodeURIComponent("#" + x.word + "#"),
  }));
}

// 抖音热榜:官方公开接口,免登录免签名
async function fetchDouyin() {
  const r = await get("https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/", { "User-Agent": UA });
  const list = JSON.parse(r.body).word_list || [];
  const tags = { 1: "新", 3: "热", 5: "荐", 8: "首发", 16: "辟谣" };
  return list.slice(0, TOP).map((x, i) => ({
    rank: i + 1,
    title: x.word,
    hot: x.hot_value || 0,
    tag: tags[x.label] || "",
    search_url: "https://www.douyin.com/search/" + encodeURIComponent(x.word),
  }));
}

function fmtHot(n) {
  if (n >= 1e8) return (n / 1e8).toFixed(1) + "亿";
  if (n >= 1e4) return (n / 1e4).toFixed(1) + "万";
  return String(n);
}

const [wb, dy] = await Promise.allSettled([fetchWeibo(), fetchDouyin()]);
const weibo = wb.status === "fulfilled" ? wb.value : [];
const douyin = dy.status === "fulfilled" ? dy.value : [];
const errors = [];
if (wb.status === "rejected") errors.push("weibo: " + wb.reason.message);
if (dy.status === "rejected") errors.push("douyin: " + dy.reason.message);

if (PRETTY) {
  const board = (name, rows) => {
    console.log("\n\x1b[1m" + name + "\x1b[0m");
    rows.forEach((r) => console.log(`  ${String(r.rank).padStart(2)}. ${r.title}${r.tag ? ` [${r.tag}]` : ""}  \x1b[90m${fmtHot(r.hot)}\x1b[0m`));
    if (!rows.length) console.log("  (抓取失败)");
  };
  board("微博热搜 TOP" + TOP, weibo);
  board("抖音热榜 TOP" + TOP, douyin);
  if (errors.length) console.error("\n错误:", errors.join("; "));
} else {
  const stamp = new Date().toLocaleString("zh-CN", { hour12: false });
  process.stdout.write(JSON.stringify({ stamp, top: TOP, weibo, douyin, errors }, null, 2));
}
