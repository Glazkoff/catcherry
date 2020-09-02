module.exports = {
  client: {
    service: {
      name: "my-app",
      // URL для GraphQL API
      url: "http://localhost:3000/graphql",
    },
    // Файлы, обрабатываемые расширением
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
