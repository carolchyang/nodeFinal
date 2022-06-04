const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/nodeFinal/" : "/",
  configureWebpack: {
    performance: {
      hints: "warning",
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
  },
});
