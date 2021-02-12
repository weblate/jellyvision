/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NuxtConfig } from '@nuxt/types';
import webpack from 'webpack';

const config: NuxtConfig = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: !!process.env.NUXT_SSR,
  /*
   ** Disables telemetry prompt while installing dependencies
   ** See https://github.com/nuxt/telemetry
   */
  telemetry: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Module loading mode
   ** See https://nuxtjs.org/api/configuration-modern
   */
  modern: 'client',
  /*
   ** Progress bar between routes
   ** See https://nuxtjs.org/api/configuration-loading
   */
  loading: {
    color: '#00A4DC',
    failedColor: '#FF5252',
    height: '4px'
  },
  pwa: {
    meta: {
      nativeUI: true,
      appleStatusBarStyle: 'dark',
      name: 'Jellyfin',
      theme_color: '#424242'
    },
    manifest: {
      name: 'Jellyfin',
      background_color: '#101010'
    }
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - Jellyfin',
    title: 'Jellyfin',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/global.scss', '@mdi/font/css/materialdesignicons.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // Development
    'plugins/axe.ts',
    // General
    'plugins/persistedState.ts',
    'plugins/appInitPlugin.ts',
    'plugins/veeValidate.ts',
    'plugins/nativeWebsocketPlugin.ts',
    // Components
    { src: 'plugins/components/swiper.ts', mode: 'client' },
    'plugins/components/vueVirtualScroller.ts',
    'plugins/components/veeValidate.ts',
    'plugins/components/vueDraggable.ts',
    // Utility
    { src: 'plugins/browserDetection.ts', mode: 'client' },
    { src: 'plugins/playbackProfile.ts', mode: 'client' },
    'plugins/apiPlugin.ts'
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/date-fns',
    '@nuxtjs/imagemin'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-i18n',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['user', 'deviceProfile']
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  /*
   ** Router configuration
   */
  router: {
    middleware: ['auth']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: ''
  },
  /*
   ** Axios-based Authentication
   ** See https://auth.nuxtjs.org/schemes/local.html#options
   */
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      jellyfin: {
        _scheme: '~/schemes/jellyfinScheme'
      }
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/'
      }
    }
  },
  i18n: {
    locales: [
      { code: 'cs', iso: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'enUS', iso: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'es', iso: 'es-ES', name: 'Español (España)', file: 'es.json' },
      {
        code: 'es419',
        iso: 'es-419',
        name: 'Español (América Latina)',
        file: 'es_419.json'
      },
      { code: 'fi', iso: 'fi-FI', name: 'Suomi', file: 'fi.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'hu', iso: 'hu-HU', name: 'Magyar', file: 'hu.json' },
      { code: 'kk', iso: 'kk-KK', name: 'қазақ тілі', file: 'kk.json' },
      { code: 'lt', iso: 'lt-LT', name: 'Lietuvių kalba', file: 'lt.json' },
      { code: 'ml', iso: 'ml-ML', name: 'മലയാളം', file: 'ml.json' },
      { code: 'nb', iso: 'nb-NO', name: 'Norsk', file: 'nb_NO.json' },
      { code: 'nl', iso: 'nl-NL', name: 'Nederlands', file: 'nl.json' },
      { code: 'pa', iso: 'pa-PA', name: 'ਪੰਜਾਬੀ', file: 'pa.json' },
      { code: 'pl', iso: 'pl-PL', name: 'Polski', file: 'pl.json' },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português (Brasil)',
        file: 'pt_BR.json'
      },
      { code: 'ro', iso: 'ro-RO', name: 'Română', file: 'ro.json' },
      { code: 'ru', iso: 'ru-RU', name: 'русский', file: 'ru.json' },
      { code: 'sk', iso: 'sk-SK', name: 'Slovenčina', file: 'sk.json' },
      { code: 'sl', iso: 'sl-SI', name: 'Slovenščina', file: 'sl.json' },
      { code: 'sv', iso: 'sv-SE', name: 'Svenska', file: 'sv.json' },
      { code: 'ta', iso: 'ta-IN', name: 'தமிழ்', file: 'ta.json' },
      { code: 'tr', iso: 'tr-TR', name: 'Türkçe', file: 'tr.json' },
      { code: 'vi', iso: 'vi-VN', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'zhCN', iso: 'zh_Hans', name: '简体中文', file: 'zh_Hans.json' }
    ],
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    defaultLocale: 'enUS',
    vueI18n: {
      fallbackLocale: 'enUS'
    }
  },
  dateFns: {
    // Next commented entries are locales not supported at the time of adding them
    locales: [
      'cs',
      'de',
      'enUS',
      'es',
      // 'es419',
      'fi',
      'fr',
      'hu',
      'kk',
      'lt',
      // 'ml',
      'nb',
      'nl',
      // 'pa',
      'pl',
      'pt',
      'ro',
      'ru',
      'sk',
      'sl',
      'sv',
      'ta',
      'tr',
      'vi',
      'zhCN'
    ],
    defaultLocale: 'enUS'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: true,
      default: 'dark',
      disable: false,
      themes: {
        dark: {
          primary: '#0086b3',
          secondary: '#2f3951',
          accent: '#FF4081',
          info: '#0099CC',
          warning: '#FB8C00',
          error: '#FF5252',
          success: '#4CAF50',
          background: '#14141F',
          track: '#1c2331',
          thumb: '#252e41'
        },
        light: {
          primary: '#00A4DC',
          secondary: '#424242',
          accent: '#FF4081',
          info: '#33b5e5',
          warning: '#FB8C00',
          error: '#FF5252',
          success: '#4CAF50',
          background: '#f2f2f2',
          track: '#FFFFFF',
          thumb: '#000000'
        }
      },
      options: {
        customProperties: true
      }
    }
  },
  loadingIndicator: {
    name: 'circle',
    color: '#0086b3',
    background: '#14141F'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // @ts-ignore -- Undocumented options
    loadingScreen: {
      image: 'icon.png',
      colors: {
        client: '#00A4DC',
        modern: '#aa5cc3',
        server: '#424242'
      }
    },
    babel: {
      // envName: server, client, modern
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      presets(): any {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              corejs: { version: 3 }
            }
          ]
        ];
      }
    },
    extend(
      config: webpack.Configuration,
      { isClient }: { isClient: boolean }
    ): void {
      if (isClient) {
        // Web Worker support
        config.module?.rules.push({
          test: /\.worker\.(js|ts)$/i,
          use: [
            {
              loader: 'comlink-loader',
              options: {
                singleton: true
              }
            }
          ]
        });
      }
    },
    transpile: ['@nuxtjs/auth', 'vee-validate/dist/rules']
  },

  /**
   * Host set to 0.0.0.0 in order to access the dev server on the LAN
   */
  server: {
    host: '0.0.0.0'
  }
};

export default config;
