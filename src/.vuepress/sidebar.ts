import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // "portfolio",
    // {
    //   text: "案例",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "文档",
    //   icon: "book",
    //   prefix: "guide/",
    //   children: "structure",
    // },
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
  '/js': 'structure',
  '/java': 'structure',
  '/linux/linux基础': 'structure',
  '/linux/docker': 'structure',
  '/sql/mysql': 'structure',
});
