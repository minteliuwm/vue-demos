const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/theme/index.scss";
        `
      }
    }
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
};
