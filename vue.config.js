const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/nodeFinal/" : "/",
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 200000,
        maxSize: 250000,
      },
    },
  },
});
