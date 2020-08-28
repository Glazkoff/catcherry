/** Список команд для реализации:
 * cd ./server
 * sequelize init
 * npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
 * npm i pg pg-hstore
 */

const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

/**
 * Пример для создания точки Graphql
 */

// Схема GraphQL в форме строки
const typeDefs = require("./schema");

// Резолверы
const resolvers = require("./resolvers");

// База данных
const db = require("./models/index");

// Соедняем всё в схему
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: { db },
});

// Инициализация express-приложения
const app = express();
const PORT = 3000;

// Точка входа GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { db } })
);

// GraphiQL, визуальный редактор для запросов
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Работа со статическими файлами
app.use(express.static("./public"));

// Корневой путь API
app.get("/", (req, res) => res.send("Серверная часть проекта ФИШКА"));

db.sequelize.sync().then(async () => {
  console.log(
    await db.users.create({
      name: faker.name.firstName(),
    })
  );
  // db.users
  //   .create({
  //     name: faker.name.firstName(),
  //   })
  //   .then(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  app.listen(PORT, () => {
    console.log(
      `Сервер (Graphiql) запущен на http://localhost:${PORT}/graphiql`
    );
  });
});
