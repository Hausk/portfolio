// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@unocss/nuxt'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'fr'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ]
    }
  },
  build: {
    transpile: ['three']
  },
  future: {
    compatibilityVersion: 4
  },
  experimental: {
    payloadExtraction: true
  },
  compatibilityDate: '2024-07-30',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/projects',
        '/about',
        '/contact'
      ]
    },
    preset: 'vercel',
    timing: true
  },
  vite: {
    optimizeDeps: {
      include: ['three']
    },
    build: {
      target: 'esnext' // Bun supporte les fonctionnalités modernes
    }
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
