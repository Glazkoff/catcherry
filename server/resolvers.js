require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const sequelize = require("sequelize");
// Соль для шифрования bcrypt
const salt = bcrypt.genSaltSync(10);

const Op = sequelize.Op;

// TODO: (DONE) Функция генерации токенов (принмает данные, которые мы заносим в токен )
function generateTokens(user) {
  // TODO: (DONE) генерируем рефреш-токен
  let refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 100 * 60 * 60 * 24 * 365,
    }
  );

  // TODO: (DONE) генерируем JWT токен (в токен заносим общедоступные данные)
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 100 * 60 * 60 * 24,
  });

  // TODO: (DONE) возвращать объект с двумя полями (refreshToken, accessToken)
  return {
    refreshToken,
    accessToken,
  };
}

module.exports = {
  Query: {
    users: (parent, args, { db }, info) =>
      db.Users.findAll({ order: [["id", "ASC"]] }),
    user: (parent, args, { db }, info) => {
      return db.Users.findOne({ where: { id: args.id } });
    },
    notifications: (parent, args, { db }, info) =>
      db.Notifications.findAll({ order: [["id", "ASC"]] }),
    notification: (parent, args, { db }, info) =>
      db.Notifications.findOne({ where: { id: args.id } }),

    getPointsUser: (parent, args, { db }, info) =>
      db.Points.findOne({ where: { userId: args.userId } }),
    
    
    //Функция поиска операций для конкретного пользователя
    getOperationPointsUser: async (parent, args, { db }, info) => {
      let points = await db.Points.findOne({
        attributes: [],
        include: [
          {
            model: db.PointsOperations,
            as: "pointsOperations",
            attributes: ["pointAccountId", "delta", "operationDescription"],
          },
        ],
        where: { userId: args.userId },
      });
      return points.pointsOperations;
    },
  },
  Mutation: {
    /*
      [Ниже] Мутации регистрации и авторизации
    */
    signUp: async (parent, { name, login, password }, { res, db }, info) => {
      let hashPassword = bcrypt.hashSync(password, salt);

      // TODO: (DONE) добавляем данные в БД
      let user = await db.Users.create({
        login,
        name,
        password: hashPassword,
      });

      // TODO: (DONE) Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      let tokens = generateTokens(user.dataValues);

      // TODO: (DONE) записать в Cookie HttpOnly рефреш-токен
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
      return tokens;
    },
    logIn: async (parent, { login, password }, { res, db }, info) => {
      // TODO: (DONE) сравниваем логин с БД, если нет - ошибка
      let user = await db.Users.findOne({
        where: {
          login,
        },
      });
      // TODO: (DONE) проверяем через bcrypt пароль, не совпадает - ошибка
      if (!user) {
        return null;
      } else if (bcrypt.compareSync(password, user.password)) {
        // TODO: (DONE) Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
        let tokens = generateTokens(user.dataValues);

        // TODO: (DONE) записать в Cookie HttpOnly рефреш-токен
        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        // TODO: (DONE) отправить в ответ оба токен
        return tokens;
      } else {
        return null;
      }
    },
    updateAccessToken: async (parent, {}, { req, res, db }, info) => {
      let refreshToken = req.cookies.refreshToken;
      if (
        !refreshToken ||
        !jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      ) {
        return {
          error: {
            errorStatus: 401,
            message: "Refresh token is absent",
          },
        };
      } else {
        let userId = jwt.decode(refreshToken).userId;
        let user = await db.Users.findOne({ where: { id: userId } });
        let accessToken = jwt.sign(
          user.dataValues,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 100 * 60 * 60 * 24,
          }
        );
        return {
          // TODO: выпустить токен
          accessToken,
        };
      }
    },
    /*
      [Ниже] Мутации работы с пользователями (Users)     
    */
    createUser: (parent, { name }, { db }, info) =>
      db.Users.create({
        name: name,
      }),
    updateUser: (parent, { name, id }, { db }, info) =>
      db.Users.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deleteUser: (parent, args, { db }, info) =>
      db.Users.destroy({
        where: {
          id: args.id,
        },
      }),
    /*
      [Ниже] Мутации регистрации и авторизации
    */
    signUp: async (parent, args, { db }, info) => {
      // TODO: добавить резолвер signup
      return "DO SIGN UP";
    },
    logIn: async (parent, args, { db }, info) => {
      // TODO: добавить резолвер login
      return "DO LOG IN";
    },
    /*
      [Ниже] Мутации работы с оповещениями (Notifications)     
    */
    createNotification: (parent, { body, authorId, teamId }, { db }, info) =>
      db.Notifications.create({
        body: body,
        authorId: authorId,
        teamId: teamId,
      }),
    updateNotification: (
      parent,
      { body, teamId, forAllUsers, forAllOrganization, forAllTeam, id },
      { db },
      info
    ) =>
      db.Notifications.update(
        {
          body: body,
          teamId: teamId,
          forAllUsers: forAllUsers,
          forAllOrganization: forAllOrganization,
          forAllTeam: forAllTeam,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deleteNotification: (parent, args, { db }, info) =>
      db.Notifications.destroy({
        where: {
          id: args.id,
        },
      }),
    /*
      [Ниже] Мутации работы с баллами (PointsOperstion)     
    */
    createPointOperation: (parent, { pointAccountId, delta }, { db }, info) =>
      db.PointsOperations.create({
        pointAccountId: pointAccountId,
        delta: delta,
      }),
    updatePointOperation: (
      parent,
      { pointAccountId, delta, id },
      { db },
      info
    ) =>
      db.PointsOperations.update(
        {
          pointAccountId: pointAccountId,
          delta: delta,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deletePointOperation: (parent, args, { db }, info) =>
      db.PointsOperations.destroy({
        where: {
          id: args.id,
        },
      }),
  },
};
