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
const faker = require("faker");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const history = require("connect-history-api-fallback");
const compression = require("compression");
const helmet = require("helmet");
const { createRateLimitDirective } = require("graphql-rate-limit");
const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive')
// Схема GraphQL в форме строки
const typeDefs = require("./schema");

// Резолверы
const resolvers = require("./resolvers");

// База данных
const db = require("./models/index");
const { log } = require("debug");

// Rate Limit
const rateLimitDirective = createRateLimitDirective({
  identifyContext: ctx => ctx.id
});

// Соедняем всё в схему
const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
  context: { db },
  schemaTransforms: [constraintDirective()],
  schemaDirectives: {
    rateLimit: rateLimitDirective,
  }
});

// Инициализация express-приложения
const app = express();
const PORT = process.env.PORT || 3000;

// Использование сжатия gzip
app.use(compression());

// Настройка парсинга Cookie
app.use(cookieParser());

// Безопасность заголовков
// Для доступа к /graphiql прописать в файле
// .env NODE_ENV = development
// либо запустить сервер командой
// NODE_ENV=development node server/server.js
if (
  process.env.NODE_ENV !== "development" &&
  process.env.NODE_ENV !== undefined
) {
  app.use(helmet());
}

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

db.sequelize
  // .sync({ force: true })
  // .sync({ alter: true })
  .sync()
  .then(async () => {
    app.listen(PORT, () => {
      // addAllTables(false);
      // db.Users.destroy({ where: {} });
      // const salt = bcrypt.genSaltSync(10);
      // for (let index = 0; index < 10; index++) {
      //   db.Users.create({
      //     name: faker.name.findName(),
      //     login: faker.random.word(),
      //     password: bcrypt.hashSync("nikita", salt),
      //   });
      // }
      // addAllTables();
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
    db.TypeNotification.destroy({ where: {} });
    db.Comments.destroy({ where: {} });
    db.LikesOfComments.destroy({ where: {} });
    db.LikesOfPosts.destroy({ where: {} });
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
    db.Users.destroy({ where: {} });
    db.UsersInTeams.destroy({ where: {} });
  }
  //Можно менять количество заполнений в переменной quantity
  let quantity = 1;
  for (let index = 0; index < quantity; index++) {
    //Тип организации
    let type = await db.OrganizationsTypes.create({
      name: faker.name.findName()
    });
    //Тип оповещения
    let typeNotification;
    if (index == 0) {
      typeNotification = await db.TypeNotification.create({
        typeName: "normal"
      });
    } else if (index == 1) {
      typeNotification = await db.TypeNotification.create({
        typeName: "danger"
      });
    } else {
      typeNotification = await db.TypeNotification.create({
        typeName: faker.name.findName()
      });
    }
    //Пользователи
    const salt = bcrypt.genSaltSync(10);
    let user = await db.Users.create({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      patricity: faker.name.findName(),
      gender: faker.name.gender(),
      birthday: faker.date.past(),
      login: faker.random.word(),
      password: bcrypt.hashSync("nikita", salt)
    });
    //Администраторы
    let administrators = await db.Administrators.create({
      userId: user.dataValues.id
    });
    let role = await db.Roles.create({
      name: faker.name.findName(),
      description: faker.lorem.paragraph()
    });
    //Организации
    let organization = await db.Organizations.create({
      name: faker.name.findName(),
      ownerId: user.dataValues.id,
      organizationTypeId: type.dataValues.id,
      maxTeamsLimit: faker.random.number()
    });
    //Команды
    let team = await db.Teams.create({
      organizationId: organization.dataValues.id,
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      maxUsersLimit: faker.random.number()
    });

    //Оповещения
    let notification = await db.Notifications.create({
      body: {
        header: faker.random.word(),
        text: faker.lorem.paragraph()
      },
      typeId: typeNotification.dataValues.id,
      authorId: user.dataValues.id,
      userId: [
        user.dataValues.id,
        user.dataValues.id + 1,
        user.dataValues.id + 2
      ],
      endTime: faker.date.future()
    });
    let readnotification = await db.ReadNotification.create({
      notificationId: notification.dataValues.id,
      userId: user.dataValues.id,
      readOrNot: faker.random.boolean()
    });

    //Задачи
    let tasks = await db.Tasks.create({
      teamId: team.dataValues.id,
      userId: user.dataValues.id,
      body: {
        header: faker.random.word(),
        text: faker.lorem.paragraph(),
        points: faker.random.number()
      },
      status: faker.random.word()
    });
    //Посты
    let post = await db.Posts.create({
      body: {
        header: faker.random.word(),
        text: faker.lorem.paragraph()
      },
      authorId: user.dataValues.id,
      organizationId: organization.dataValues.id,
      forAllTeam: faker.random.boolean()
    });
    let likesOfPost = await db.LikesOfPosts.create({
      userId: user.dataValues.id,
      postId: post.dataValues.id
    });
    let teamcustomization = await db.TeamCustomization.create({
      settings: faker.lorem.paragraph()
    });
    //Пользователи в команде
    let usersinteams = await db.UsersInTeams.create({
      userId: user.dataValues.id,
      teamId: team.dataValues.id,
      status: faker.random.word(),
      roleId: role.dataValues.id
    });
    //Баллы
    let pointsuser = await db.Points.create({
      userId: user.dataValues.id,
      pointQuantity: faker.random.number()
    });
    //Операции с баллами
    let pointsoperations = await db.PointsOperations.create({
      pointAccountId: pointsuser.dataValues.id,
      delta: faker.random.number(),
      operationDescription: faker.random.word()
    });
    //Комментарии
    // let comment = await db.Comments.create({
    //   authorId: user.dataValues.id,
    //   postId: post.dataValues.id,
    //   body: {
    //     header: faker.random.word(),
    //     text: faker.lorem.paragraph()
    //   },
    //   dateAdd: faker.random.number()
    // });
    //Лайки для комментариев
    // let likesofcomments = await db.LikesOfComments.create({
    //   userId: user.dataValues.id,
    //   commentId: comment.dataValues.id
    // });
    //Лайки для постов
    let likesofposts = await db.LikesOfPosts.create({
      userId: user.dataValues.id,
      postId: post.dataValues.id
    });
  }
}
/* TODO: рекомендую использовать следующие библиотеки
  (перед использованием необходимо установить, см. документацию каждой библиотеки в Интернете)
  - const expressJwt = require("express-jwt");
  - const bcrypt = require("bcrypt")
*/
