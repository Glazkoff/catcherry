module.exports = {
  devServer: {
    proxy: "http://localhost:3000"
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.scss";`
      }
    }
  }
};
