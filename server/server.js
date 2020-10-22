/** Список команд для реализации:
 * cd ./server
 * sequelize init
 * npm install --save apollo-server-express@1 graphql-tools graphql express body-parser
 * npm i pg pg-hstore
 *
 * Ссылки на статьи:
 * https://medium.com/valtech-ch/setup-a-graphql-api-with-apollo-2-0-sequelize-and-express-js-608d1365d776
 * https://medium.com/codingthesmartway-com-blog/apollo-server-2-introduction-efc4026f5654
 * https://markomatic.me/blog/node-express-sequelize-pg-graphql/
 * https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize
 */
require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker/locale/en");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

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

// Настройка парсинга Cookie
app.use(cookieParser());

// Настройка CORS политики для разработки
app.use(cors());

// Точка входа GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    schema,
    context: { req, res, db },
  }))
);

// GraphiQL, визуальный редактор для запросов
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Работа со статическими файлами
app.use(express.static("./public"));

// Корневой путь API
app.get("/", (req, res) => res.send("Серверная часть проекта ФИШКА"));

// TODO: добавить заполнение фейковыми данными

db.sequelize
  // .sync({ force: true })
  .sync()
  .then(async () => {
    app.listen(PORT, () => {
      // db.Users.destroy({ where: {} });
      // const salt = bcrypt.genSaltSync(10);
      // for (let index = 0; index < 20; index++) {
      //   db.Users.create({
      //     surname: faker.name.lastName(),
      //     name: faker.name.firstName(),
      //     patricity: faker.name.firstName(),
      //     login: faker.random.word(),
      //     password: bcrypt.hashSync("nikita", salt),
      //     gender: 'Мужской',
      //     birthday: faker.date.past()
      //   });
      // }
      console.log(
        chalk.yellow(`Сервер (Graphiql) запущен на`),
        chalk.cyan(`http://localhost:${PORT}/graphiql`)
      );
    });
  });

/* TODO: рекомендую использовать следующие библиотеки
  (перед использованием необходимо установить, см. документацию каждой библиотеки в Интернете)
  - const expressJwt = require("express-jwt");
  - const bcrypt = require("bcrypt")
*/