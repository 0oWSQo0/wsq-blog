import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/portfolio",
  {
    text: '前端',
    icon: 'devicon:javascript',
    link: '/js/'
  },
  {
    text: 'Java',
    icon: 'devicon:java',
    prefix: '/java/',
    children: [
      { text: 'Mybatis', link: '/java/mybatis', icon: 'devicon:spring' },
      { text: 'Spring', link: '/java/spring', icon: 'devicon:spring' },
      { text: 'springBoot', link: '/java/springBoot', icon: 'devicon:spring' }
    ]
  },
  {
    text: 'SQL',
    icon: 'devicon:azuresqldatabase',
    prefix: '/sql/',
    children: [
      { text: 'Redis', link: '/sql/redis/', icon: 'devicon:redis' },
      { text: 'MySQL', link: '/sql/mysql/', icon: 'devicon:mysql-wordmark' }
    ]
  },
  {
    text: 'Linux',
    icon: 'devicon:centos',
    prefix: '/linux/',
    children: [
      { text: 'linux基础', link: '/linux/linux基础/', icon: 'devicon:linux' },
      { text: 'Docker', link: '/linux/docker/', icon: 'mdi:docker'}
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
  //       prefix: "linux/",
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
