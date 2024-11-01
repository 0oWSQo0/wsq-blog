import { defineClientConfig } from "vuepress/client";
import 'vuepress-theme-hope/presets/bounce-icon.scss'
import { defineMermaidConfig } from 'vuepress-plugin-md-enhance/client'

defineMermaidConfig({
    sequence: {
        mirrorActors: false
    }
})

export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {},
    rootComponents: [],
});
