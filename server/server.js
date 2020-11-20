"use strict";
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
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker/locale/en");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const compression = require("compression");
const helmet = require("helmet");

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
  context: { db }
});

// Инициализация express-приложения
const app = express();
const PORT = 3000;

// Использование сжатия gzip
app.use(compression());

// Настройка парсинга Cookie
app.use(cookieParser());

// Настройка CORS политики для разработки
app.use(cors());

// Безопасность заголовков
// FIXME: не работает путь /graphiql при использовании
// app.use(helmet());

// Точка входа GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    schema,
    context: { req, res, db }
  }))
);

// GraphiQL, визуальный редактор для запросов
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Поддержка режима HTML5 History для SPA
// Все указанные выше запросы обрабатываются без history
app.use(history());

// Работа со статическими файлами
app.use(express.static(path.join(__dirname, "../dist")));

// Работа со статическими файлами
app.use("/public", express.static(path.join(__dirname, "/public")));

// TODO: добавить заполнение фейковыми данными

db.sequelize
  .sync({ alter: true })
  // .sync()
  .then(async () => {
    app.listen(PORT, () => {
      // db.Users.destroy({ where: {} });
      // const salt = bcrypt.genSaltSync(10);
      // for (let index = 0; index < 10; index++) {
      //   db.Users.create({
      //     name: faker.name.findName(),
      //     login: faker.random.word(),
      //     password: bcrypt.hashSync("nikita", salt),
      //   });
      // }
      addAllTables(false);
      console.log(
        chalk.yellow(`Сервер (Graphiql) запущен на`),
        chalk.cyan(`http://localhost:${PORT}/graphiql`)
      );
      console.log(
        chalk.green(`Клиентская часть запущена на`),
        chalk.cyan(`http://localhost:${PORT}/`)
      );
      console.log(
        chalk.blueBright(`Статические файлы доступны на`),
        chalk.cyan(`http://localhost:${PORT}/public/...`)
      );
    });
  });
let destroyTable;
async function addAllTables(destroyTable) {
  if (destroyTable == true) {
    db.Administrators.destroy({ where: {} });
    db.Notifications.destroy({ where: {} });
    db.Organizations.destroy({ where: {} });
    db.OrganizationsTypes.destroy({ where: {} });
    db.Points.destroy({ where: {} });
    db.PointsOperations.destroy({ where: {} });
    db.Posts.destroy({ where: {} });
    db.ReadNotification.destroy({ where: {} });
    db.Roles.destroy({ where: {} });
    db.Tasks.destroy({ where: {} });
    db.TeamCustomization.destroy({ where: {} });
    db.Teams.destroy({ where: {} });
  }
  //Можно менять количество заполнений в переменной quantity
  let quantity = 10;
  for (let index = 0; index < quantity; index++) {
    let type = await db.OrganizationsTypes.create({
      name: faker.name.findName()
    });
    const salt = bcrypt.genSaltSync(10);
    let user = await db.Users.create({
      name: faker.name.findName(),
      login: faker.random.word(),
      password: bcrypt.hashSync("nikita", salt)
    });
    let administrators = await db.Administrators.create({
      userId: user.dataValues.id
    });
    let role = await db.Roles.create({
      name: faker.name.findName(),
      description: faker.lorem.paragraph()
    });
    let organization = await db.Organizations.create({
      name: faker.name.findName(),
      ownerId: user.dataValues.id,
      organizationTypeId: type.dataValues.id,
      maxTeamsLimit: faker.random.number()
    });
    let team = await db.Teams.create({
      organizationId: organization.dataValues.id,
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      maxUsersLimit: faker.random.number()
    });
    let notification = await db.Notifications.create({
      body: {
        header: faker.random.word(),
        text: faker.lorem.paragraph()
      },
      authorId: user.dataValues.id,
      teamId: team.dataValues.id,
      checkNotification: faker.random.boolean(),
    });
    let readnotification = await db.ReadNotification.create({
      notificationId: notification.dataValues.id,
      userId: user.dataValues.id,
      readOrNot: faker.random.boolean()
    });

    let tasks = await db.Tasks.create({
      userId: user.dataValues.id,
      body: {
        text: faker.lorem.paragraph()
      },
      status: faker.random.word()
    });
    let posts = await db.Posts.create({
      body: faker.lorem.paragraph(),
      authorId: user.dataValues.id,
      organizationId: team.dataValues.id,
      forAllTeam: faker.random.boolean()
    });
    let teamcustomization = await db.TeamCustomization.create({
      settings: faker.lorem.paragraph()
    });
    let usersinteams = await db.UsersInTeams.create({
      userId: user.dataValues.id,
      teamId: team.dataValues.id,
      status: faker.random.word(),
      roleId: role.dataValues.id
    });
    let pointsuser = await db.Points.create({
      userId: user.dataValues.id,
      pointQuantity: faker.random.number()
    });
    let pointsoperations = await db.PointsOperations.create({
      pointAccountId: pointsuser.dataValues.id,
      delta: faker.random.number(),
      operationDescription: faker.lorem.paragraph()
    });
  }

  // console.log(pointsuser);
}
/* TODO: рекомендую использовать следующие библиотеки
  (перед использованием необходимо установить, см. документацию каждой библиотеки в Интернете)
  - const expressJwt = require("express-jwt");
  - const bcrypt = require("bcrypt")
*/
