module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
  },
  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach(rule => {
      config.module
        .rule("scss")
        .oneOf(rule)
        .use("resolve-url-loader")
        .loader("resolve-url-loader")
        .before("sass-loader")
        .end()
        .use("sass-loader")
        .loader("sass-loader")
        .tap(options => ({ ...options, sourceMap: true }));
    });

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
