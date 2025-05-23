import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://0oWSQo0.github.io",
  author: {
    name: "WSQ",
    url: "https://0oWSQo0.github.com",
  },
  iconAssets: "iconify",
  logo: "logo.png",
  repo: "https://0oWSQo0.github.com",
  docsDir: "src",
  // 导航栏
  navbar,
  // 侧边栏
  sidebar,
  // 页脚
  footer: "",
  displayFooter: false,

  // 加密配置
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },
  editLink: false,
  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    // blog: true,
    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    comment: {
      comment: false,
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },
    markdownMath: {
      type: "katex"
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    // markdown增强配置
    mdEnhance: {
      align: true,
      attrs: true,
      // codetabs: true,
      component: true,
      demo: true,
      breaks: true,
      // figure: true,
      // imgLazyload: true,
      // imgSize: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      // tabs: true,
      tasklist: true,
      vPre: true,
      // 在启用之前安装 chart.js
      // chart: true,
      // insert component easily
      // 在启用之前安装 echarts
      // echarts: true,
      // 流程图，在启用之前安装 flowchart.ts
      flowchart: true,
      // gfm requires mathjax-full to provide tex support
      // gfm: true,


      // 在启用之前安装 mermaid
      mermaid: true,
      markmap: true,
      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },
    shiki: {
      lineNumbers: false,
      theme: 'github-dark-high-contrast',
      // themes: {
      //   light: 'andromeeda',
      //   dark: 'vitesse-light',
      // }
    }

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
}, {
  custom: true
});
