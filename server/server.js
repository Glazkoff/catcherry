/** Список команд для реализации:
 * cd ./server
 * sequelize init
 * npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
 */

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

/**
 * Пример для создания точки Graphql
 */

// Немного данных для примера
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

// Схема GraphQL в форме строки
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// Резолверы
const resolvers = {
  Query: { books: () => books },
};

// Соедняем всё в схему
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Инициализация express-приложения
const app = express();
const PORT = 3000;

// Точка входа GraphQL
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, визуальный редактор для запросов
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.get("/", (req, res) => res.send("Серверная часть проекта ФИШКА"));

app.listen(PORT, () => {
  // console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Graphiql запущен на http://localhost:${PORT}/graphiql`);
});
