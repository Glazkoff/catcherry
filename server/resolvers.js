require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Соль для шифрования bcrypt
const salt = bcrypt.genSaltSync(10);

// TODO: (DONE) Функция генерации токенов (принмает данные, которые мы заносим в токен )
function generateTokens(user) {
  // TODO: (DONE) генерируем рефреш-токен
  let refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 100 * 60 * 60 * 24 * 365
    }
  );

  // TODO: (DONE) генерируем JWT токен (в токен заносим общедоступные данные)
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 100 * 60 * 60 * 24
  });

  // TODO: (DONE) возвращать объект с двумя полями (refreshToken, accessToken)
  return {
    refreshToken,
    accessToken
  };
}

module.exports = {
  Query: {
    users: (parent, args, { db }, info) =>
      db.Users.findAll({ order: [["id", "ASC"]] }),
    user: (parent, args, { db }, info) => {
      return db.Users.findOne({ where: { id: args.id } });
    },
    organizations: (parent, args, { db }, info) =>
      db.Organizations.findAll({ order: [["id", "ASC"]] }),
    organization: (parent, args, { db }, info) => {
      return db.Organizations.findOne({ where: { id: args.id } });
    },
    teams: (parent, args, { db }, info) =>
      db.Teams.findAll({ order: [["id", "ASC"]] }),
    team: (parent, args, { db }, info) => {
      return db.Teams.findOne({
        where: { organizationId: args.organizationId }
      });
    },
    usersInTeams: (parent, args, { db }, info) =>
      db.UsersInTeams.findAll({
        where: { status: "Принят" },
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),
    oneUserInTeams: (parent, args, { db }, info) =>
      db.UsersInTeams.findAll({
        where: { userId: args.userId},
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),
    notifications: (parent, args, { db }, info) =>
      db.Notifications.findAll({ order: [["id", "ASC"]] }),
    notification: (parent, args, { db }, info) =>
      db.Notifications.findOne({ where: { id: args.id } })
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
        password: hashPassword
      });

      // TODO: (DONE) Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      let tokens = generateTokens(user.dataValues);

      // TODO: (DONE) записать в Cookie HttpOnly рефреш-токен
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365
      });
      return tokens;
    },
    logIn: async (parent, { login, password }, { res, db }, info) => {
      // TODO: (DONE) сравниваем логин с БД, если нет - ошибка
      let user = await db.Users.findOne({
        where: {
          login
        }
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
          maxAge: 1000 * 60 * 60 * 24 * 365
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
            message: "Refresh token is absent"
          }
        };
      } else {
        let userId = jwt.decode(refreshToken).userId;
        let user = await db.Users.findOne({ where: { id: userId } });
        let accessToken = jwt.sign(
          user.dataValues,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: 100 * 60 * 60 * 24
          }
        );
        return {
          // TODO: выпустить токен
          accessToken
        };
      }
    },
    /*
      [Ниже] Мутации работы с пользователями (Users)     
    */
    createUser: (parent, { name }, { db }, info) =>
      db.Users.create({
        name: name
      }),
    updateUser: (
      parent,
      { name, surname, patricity, gender, birthday, login, id },
      { db },
      info
    ) =>
      db.Users.update(
        {
          name: name,
          surname: surname,
          patricity: patricity,
          gender: gender,
          birthday: birthday,
          login: login
        },
        {
          where: {
            id: id
          }
        }
      ),
    deleteUser: (parent, args, { db }, info) =>
      db.Users.destroy({
        where: {
          id: args.id
        }
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
      [Ниже] Мутации работы с организациями (Organization)     
    */
    createOrganization: (
      parent,
      { name, ownerId, organizationTypeId, maxTeamsLimit },
      { db },
      info
    ) =>
      db.Organizations.create({
        name: name,
        ownerId: ownerId,
        organizationTypeId: organizationTypeId,
        maxTeamsLimit: maxTeamsLimit
      }),
    updateOrganization: (
      parent,
      { name, ownerId, organizationTypeId, maxTeamsLimit, id },
      { db },
      info
    ) =>
      db.Organizations.update(
        {
          name: name,
          ownerId: ownerId,
          organizationTypeId: organizationTypeId,
          maxTeamsLimit: maxTeamsLimit
        },
        {
          where: {
            id: id
          }
        }
      ),
    deleteOrganization: (parent, args, { db }, info) =>
      db.Organizations.destroy({
        where: {
          id: args.id
        }
      }),
    /*
      [Ниже] Мутации работы с командами (Teams)     
    */
    createTeam: (
      parent,
      { organizationId, name, description, maxUsersLimit },
      { db },
      info
    ) =>
      db.Teams.create({
        organizationId: organizationId,
        name: name,
        description: description,
        maxUsersLimit: maxUsersLimit
      }),

    /*
      [Ниже] Мутации работы с заявками в команду (UsersInTeams)     
    */
    createUserInTeam: (
      parent,
      { userId, teamId, status, roleId },
      { db },
      info
    ) =>
      db.UsersInTeams.create({
        userId: userId,
        teamId: teamId,
        status: status,
        roleId: roleId
      }),
    deleteUserInTeam: (parent, args, { db }, info) =>
      db.UsersInTeams.destroy({
        where: {
          id: args.id
        }
      }),
    /*
      [Ниже] Мутации работы с оповещениями (Notifications)     
    */
    createNotification: (parent, { body, authorId, teamId }, { db }, info) =>
      db.Notifications.create({
        body: body,
        authorId: authorId,
        teamId: teamId
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
          forAllTeam: forAllTeam
        },
        {
          where: {
            id: id
          }
        }
      ),
    deleteNotification: (parent, args, { db }, info) =>
      db.Notifications.destroy({
        where: {
          id: args.id
        }
      })
  }
};
