import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://sinergiavalores.com",
  image: {
    domains: ["images.unsplash.com"],
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
        },
      },
    }),
    starlight({
      title: "Sinergia Valores S.A",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es",
        },
        es: {
          label: "Español",
          lang: "es",
        },
      },
      sidebar: [
        {
          label: "Quick Start Guides",
          translations: {
            es: "Guías de Inicio Rápido",
          },
          autogenerate: {
            directory: "guides",
          },
        },
        {
          label: "Tools & Equipment",
          items: [
            {
              label: "Tool Guides",
              link: "tools/tool-guides/",
            },
            {
              label: "Equipment Care",
              link: "tools/equipment-care/",
            },
          ],
        },
        {
          label: "Construction Services",
          autogenerate: {
            directory: "construction",
          },
        },
        {
          label: "Advanced Topics",
          autogenerate: {
            directory: "advanced",
          },
        },
      ],
      social: {
        github: "https://github.com/mearashadowfax/ScrewFast",
      },
      disable404Route: true,
      customCss: ["./src/styles/global.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://screwfast.uk/social.webp",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            content: "https://screwfast.uk/social.webp",
          },
        },
      ],
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    react(),
  ],
  output: "server",
  experimental: {
    clientPrerender: true,
    directRenderScript: true,
  },
  adapter: vercel(),
});
