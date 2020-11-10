require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

// Соль для шифрования bcrypt
const salt = bcrypt.genSaltSync(10);

// Функция генерации токенов (принмает данные, которые мы заносим в токен )
function generateTokens(user) {
  // Генерируем рефреш-токен
  let refreshToken = v4();

  // Генерируем JWT токен (в токен заносим общедоступные данные)
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
  });

  // Возвращаем объект с двумя полями (refreshToken, accessToken)
  return {
    refreshToken,
    accessToken
  };
}

async function addRefreshSession(db, userId, refreshToken, fingerprint) {
  try {
    // Задаём объект сессии
    let USER_OBJECT = {
      userId,
      refreshToken,
      // ua,
      fingerprint,
      // ip: ip
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    };

    // Находим предыдущую сессию на этом клиенте
    let prevSession = await db.RefreshSessions.findOne({
      where: {
        fingerprint
      }
    });

    // Если нет предыдущая сессия на этом клиенте, создаём новую для клиента
    if (!prevSession) {
      // Считаем количество клиентов (сессий) для пользователя
      let sessionsCount = await db.RefreshSessions.count({
        where: {
          userId
        }
      });

      // Если количество клиентов для пользователя больше 5, удаляем все сессии
      if (sessionsCount > 5) {
        await db.RefreshSessions.destroy({
          where: {
            userId
          }
        });
      }

      // Создаём новую сессию
      let res = await db.RefreshSessions.create(USER_OBJECT);
      return res;
    }
    // Если есть предыдущие сессии, удаляем и создаём ещё раз
    else {
      await db.RefreshSessions.destroy({
        where: {
          userId,
          fingerprint
        }
      });
      let sessionsUpdate = await db.RefreshSessions.create(USER_OBJECT);
      return sessionsUpdate;
    }
  } catch (error) {
    // Возвращаем ошибку в случае возникновения
    return error;
  }
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
    notifications: (parent, args, { db }, info) =>
      db.Notifications.findAll({ order: [["id", "ASC"]] }),
    notification: (parent, args, { db }, info) =>
      db.Notifications.findOne({ where: { id: args.id } }),

    usersInTeams: (parent, { teamId }, { db }, info) =>
      db.UsersInTeams.findAll({
        where: { status: "Принят", teamId: teamId },
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),
    raitingInTeams: (parent, { teamId }, { db }, info) =>
      db.UsersInTeams.findAll({
        where: { status: "Принят", teamId: teamId },
        include: [
          {
            model: db.Users,
            as: "user",
            include: {
              model: db.Points,
              as: "userPoints",
              include: {
                model: db.PointsOperations,
                as: "pointsOperation"
              }
            }
          }
        ]
      }),
    requests: (parent, { teamId }, { db }, info) =>
      db.UsersInTeams.findAll({
        where: { status: "Не принят", teamId: teamId },
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),

    getPointsUser: (parent, args, { db }, info) =>
      db.Points.findOne({
        where: { userId: args.userId },
        order: [["id", "ASC"]]
      }),
    getOperationPointsUser: (parent, args, { db }, info) =>
      db.PointsOperations.findAll({
        where: { pointAccountId: args.pointAccountId },
        order: [["id", "ASC"]]
      }),
    tasks: (parent, { teamId }, { db }, info) =>
      db.Tasks.findAll({
        where: { teamId: teamId },
        order: [["id", "DESC"]],
        include: [
          {
            model: db.Users,
            as: "tasksUser",
            include: {
              model: db.Points,
              as: "userPoints"
            }
          },
          {
            model: db.Teams,
            as: "tasksTeam",
            include: {
              model: db.UsersInTeams,
              as: "team"
            }
          }
        ]
        // include: [
        //
        // ]
      })
  },
  Mutation: {
    /*
      [Ниже] Мутации регистрации и авторизации
    */
    signUp: async (
      parent,
      { name, login, password, fingerprint },
      { res, db },
      info
    ) => {
      let hashPassword = bcrypt.hashSync(password, salt);

      // Добавляем данные в БД
      let user = await db.Users.create({
        login,
        name,
        password: hashPassword
      });

      // Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      let tokens = generateTokens(user.dataValues);

      // Добавляем сессию в БД
      await addRefreshSession(
        db,
        user.dataValues.id,
        tokens.refreshToken,
        fingerprint
      );

      // Записать в Cookie HttpOnly рефреш-токен
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
      });
      return tokens;
    },
    logIn: async (
      parent,
      { login, password, fingerprint },
      { res, db },
      info
    ) => {
      console.log(login, password, fingerprint);
      // Сравниваем логин с БД, если нет - ошибка
      let user = await db.Users.findOne({
        where: {
          login
        }
      });
      // Проверяем через bcrypt пароль, не совпадает - ошибка
      if (!user) {
        return {
          errror: {
            errorStatus: 401,
            message: "Incorrect login or password!"
          }
        };
      } else if (bcrypt.compareSync(password, user.password)) {
        // Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
        let tokens = generateTokens(user.dataValues);
        // Добавляем сессию в БД
        await addRefreshSession(
          db,
          user.dataValues.id,
          tokens.refreshToken,
          fingerprint
        );
        // Записать в Cookie HttpOnly рефреш-токен
        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
        });
        // Отправить в ответ оба токен
        return tokens;
      } else {
        return {
          errror: {
            errorStatus: 401,
            message: "Incorrect login or password!"
          }
        };
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
      [Ниже] Мутации работы с организациями (Organization)     
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
      }),

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
      [Ниже] Мутации работы с заявками на вхождение в команду     
    */
    acceptRequst: (parent, { id }, { db }, info) =>
      db.UsersInTeams.update(
        {
          status: "Принят"
        },
        {
          where: {
            id: id
          }
        }
      ),

    revokeRequst: (parent, { id }, { db }, info) =>
      db.UsersInTeams.update(
        {
          status: "Не принят"
        },
        {
          where: {
            id: id
          }
        }
      ),
    /*
      [Ниже] Мутации работы с баллами     
    */
    createPointOperation: async (
      parent,
      { pointAccountId, delta, operationDescription },
      { db },
      info
    ) => {
      let total = await db.Points.findOne({
        where: { id: pointAccountId }
      });
      db.Points.update(
        {
          pointQuantity: total.pointQuantity + delta
        },
        {
          where: {
            id: pointAccountId
          }
        }
      );
      return db.PointsOperations.create({
        pointAccountId: pointAccountId,
        delta: delta,
        operationDescription: operationDescription
      });
    },
    /*
      [Ниже] Мутации работы с командами     
    */
    updateTeam: (
      parent,
      { id, name, description, maxUsersLimit },
      { db },
      info
    ) =>
      db.Teams.update(
        {
          name: name,
          description: description,
          maxUsersLimit: maxUsersLimit
        },
        {
          where: {
            id: id
          }
        }
      ),

    /*
      [Ниже] Мутации работы с задачами     
    */
    createTask: (
      parent,
      { userId, header, text, points, status },
      { db },
      info
    ) =>
      db.Tasks.create({
        userId: userId,
        body: { header: header, text: text, points: points },
        status: status
      }),
    updateTask: (parent, { id, status }, { db }, info) =>
      db.Tasks.update(
        {
          status: status
        },
        {
          where: {
            id: id
          }
        }
      )
  }
};
