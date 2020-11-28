module.exports = {
  client: {
    service: {
      name: "my-app",
      // URL для GraphQL API
      url: "/graphql"
    },
    // Файлы, обрабатываемые расширением
    includes: ["src/**/*.vue", "src/**/*.js"]
  }
};
