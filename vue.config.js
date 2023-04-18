const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all"
  },

})
