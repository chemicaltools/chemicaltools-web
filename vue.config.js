const WebpackCdnPlugin = require('webpack-cdn-plugin')
module.exports = {
  publicPath: process.env.CDN_COMMIT ? `//cdn.jsdelivr.net/gh/chemicaltools/chemicaltools-web@${process.env.CDN_COMMIT}/` : './',
  pluginOptions: {
    cordovaPath: 'src-cordova',
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    iconPaths: {
      maskIcon: 'chemicaltools.svg'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
    }
  },
  configureWebpack: {
    plugins: [
      ...(
        process.env.CDN === 'yes'
          ? [
              new WebpackCdnPlugin({
                modules: [
                  { name: 'vue', var: 'Vue', path: 'dist/vue.runtime.min.js' },
                  { name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.min.js' },
                  { name: '@fortawesome/fontawesome-free', style: 'css/all.min.css', cssOnly: true },
                  { name: 'chemicaltools', var: 'chemicaltools', path: 'dist/main.js' },
                  { name: 'vue-i18n', var: 'VueI18n', path: 'dist/vue-i18n.min.js' },
                  { name: 'vue2-storage', var: 'Vue2Storage', path: 'dist/vue2-storage.min.js' }
                  // { name: 'vuetify', var: 'Vuetify', path: 'dist/vuetify.min.js', style: 'dist/vuetify.min.css' },
                  // { name: 'core-js-bundle', path: 'minified.js' },
                ],
                prodUrl: '//cdn.jsdelivr.net/npm/:name@:version/:path'
                // publicPath: './node_modules'
              })]
          : [])
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .test(/\.m?jsx?$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('ifdef-loader')
      .loader('ifdef-loader')
      .end()
  }
}
