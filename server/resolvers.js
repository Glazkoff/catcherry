require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// TODO: (DONE) Функция генерации токенов (принмает данные, которые мы заносим в токен )
function generateTokens(user) {
  // TODO: (DONE) генерируем рефреш-токен
  let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 100 * 60 * 60 * 24,
  });

  // TODO: (DONE) генерируем JWT токен (в токен заносим общедоступные данные)
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 100 * 60 * 60 * 24 * 365,
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
  },
  Mutation: {
    /*
      [Ниже] Мутации регистрации и авторизации
    */
    signUp: async (parent, args, { db }, info) => {
      // TODO: Фёдор
      // TODO: временно закоменнтировать allowNull: false в полях, которые не используются
      // TODO: добавляем данные в БД
      // TODO: создание хэша bcrypt https://www.npmjs.com/package/bcrypt
      // TODO: Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      // TODO: записать в Cookie HttpOnly рефреш-токен
      // TODO: отправить в ответ оба токена
      /** FIXME: удалить пример запросов
       * mutation($username: String!, $email: String!, $password: String!) {
       *   signUp(username: $username, email: $email, password: $password)
       *  }
       *
       * {
       *    "username": "Nikita",
       *    "email": "dasd@adsd.ew",
       *    "password": "ewqwewqeq321231231"
       * }
       */
      return "DO SIGN UP PLEASE";
    },
    logIn: async (parent, { login, password }, ctx, info) => {
      console.log("!!!!!!!!!!!");
      // TODO: (DONE) сравниваем логин с БД, если нет - ошибка
      let user = await ctx.db.Users.findOne({
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
        ctx.res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        // TODO: (DONE) отправить в ответ оба токен
        return tokens;
      } else {
        return null;
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
  },
};
