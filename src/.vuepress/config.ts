import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils"

import theme from "./theme.js";
const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/my-blog/",

  lang: "zh-CN",
  title: "",
  description: "笔记",

  theme,
  // head: [
  //   ['link',
  //   { rel: 'stylesheet', href: '/font/ark-pixel-16px-monospaced-zh_cn.otf?family=ark' }]
  // ]
  // alias: {
  //   "@theme-hope/modules/blog/components/BlogHero": path.resolve(
  //       __dirname,
  //       "./components/BlogHero.vue",
  //   ),
  // }
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
