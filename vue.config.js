const path = require('path')
const port = 8080
const svgIconDir = 'packages/SvgIcon'

const name = 'Meteor Chat' // page title
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {

  publicPath: './',
  outputDir: 'chat',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.js', '.vue', '.json', '.ts'],
    },

  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve(svgIconDir))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve(svgIconDir))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
    // ts链式配置

    config.module
      .rule('ts')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        appendTsSuffixTo: [/\.vue$/],
      }).end()
  }
}
