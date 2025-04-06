const path = require('path')
const { defineConfig } = require('@vue/cli-service')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // webpack配置 - 简单配置方式
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.less'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    }
  }
})
