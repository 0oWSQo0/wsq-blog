import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/portfolio",
  {
    text: '前端',
    icon: 'devicon:javascript',
    prefix: '/js/',
    children: [
      { text: 'JS基础', link: '/js/基础/', icon: 'devicon:javascript' },
      { text: 'ES6', link: '/js/es6/', icon: 'devicon:javascript' },

    ]
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
    text: '运维',
    icon: 'devicon:centos',
    prefix: '/linux/',
    children: [
      { text: 'linux基础', link: '/linux/linux基础/', icon: 'devicon:linux' },
      { text: 'Docker', link: '/linux/docker/', icon: 'mdi:docker' },
      { text: 'Nginx', link: '/linux/nginx/', icon: 'devicon:nginx' }
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