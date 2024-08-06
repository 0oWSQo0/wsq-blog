import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/portfolio",
  {
    text: '前端',
    icon: 'vue',
    link: '/js/'
  },
  {
    text: 'Java',
    icon: 'java',
    prefix: '/java/',
    children: [
      { text: 'Mybatis', link: '/java/mybatis' },
      { text: 'Spring', link: '/java/spring' },
      { text: 'springBoot', link: '/java/springBoot' }
    ]
  },
  {
    text: 'SQL',
    icon: 'sql',
    prefix: '/sql/',
    children: [
      { text: 'Redis', link: '/sql/redis' },
      { text: 'MySQL', link: '/sql/mysql' }
    ]
  },
  {
    text: 'Linux',
    icon: 'linux',
    prefix: '/linux/',
    children: [
      { text: 'linux基础', link: '/linux/linux基础/' },
      { text: 'Docker', link: '/linux/docker/'}
    ]
  },
  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
