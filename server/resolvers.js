require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Соль для шифрования bcrypt
const salt = bcrypt.genSaltSync(10);

// Функция генерации токенов (принмает данные, которые мы заносим в токен )
function generateTokens(user) {
  // Генерируем рефреш-токен
  let refreshToken = v4();

  // Генерируем JWT токен (в токен заносим общедоступные данные)
  let accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    // В секундах
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN / 1000
  });

  // Возвращаем объект с двумя полями (refreshToken, accessToken)
  return {
    refreshToken,
    accessToken
  };
}

// ФУНКЦИЯ: создание записи о новой сессии
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

// ФУНКЦИЯ: создание записи о новой сессии
async function updateRefreshSession(
  db,
  userId,
  oldRefreshToken,
  newRefreshToken,
  fingerprint
) {
  let result = await db.RefreshSessions.update(
    {
      refreshToken: newRefreshToken
    },
    {
      where: {
        refreshToken: oldRefreshToken,
        fingerprint,
        userId
      }
    }
  );
  return result;
}

module.exports = {
  Query: {
    isLoginUsed: async (parent, { login }, { db }) => {
      let usersCount = await db.Users.count({
        where: {
          login
        },
        paranoid: false
      });
      return usersCount != 0;
    },
    statisticsNewUsers: (parent, args, { db }) => {
      return db.Users.count({
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        paranoid: false
      });
    },
    statisticsNewOrgs: (parent, args, { db }) => {
      return db.Organizations.count({
        where: {
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        paranoid: false
      });
    },
    statisticsDeleteUsers: (parent, args, { db }) => {
      return db.Users.count({
        where: {
          deletedAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        paranoid: false
      });
    },
    statisticsDeleteOrgs: (parent, args, { db }) => {
      return db.Organizations.count({
        where: {
          deletedAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        paranoid: false
      });
    },
    // Получаем список всех пользователей
    users: (parent, args, { db }) =>
      db.Users.findAll({ order: [["id", "ASC"]] }),
    // Получаем данные про одного пользователя
    user: (parent, args, { db }) => {
      return db.Users.findOne({
        where: { id: args.id }
      });
    },
    // Получаем данные о командах пользователя + информация о команде (об организации)
    oneUserInTeams: (parent, args, { db }) =>
      db.UsersInTeams.findAll({
        where: { userId: args.userId },
        order: [["id", "ASC"]],
        include: [
          { model: db.Roles, as: "role" },
          { model: db.Users, as: "user" },
          {
            model: db.Teams,
            as: "team",
            include: [{ model: db.Organizations, as: "organization" }]
          }
        ]
      }),
    // Получаем список всех организаций
    organizations: (parent, args, { db }) =>
      db.Organizations.findAll({ order: [["id", "ASC"]] }),
    // Получаем информацию про одну организацию + тип организации + владелец организации
    organization: (parent, args, { db }) => {
      return db.Organizations.findOne({
        where: { id: args.id },
        include: [
          { model: db.OrganizationsTypes, as: "organizationType" },
          { model: db.Users, as: "owner" }
        ]
      });
    },
    // Получаем тип организации по ее id
    teamsInOneOrganization: (parent, args, { db }) => {
      return db.Teams.findAll({
        order: [["id", "ASC"]],
        where: { organizationId: args.organizationId }
      });
    },
    // Получаем список всех типов организации
    organizationTypes: (parent, args, { db }) =>
      db.OrganizationsTypes.findAll({ order: [["id", "ASC"]] }),
    teams: (parent, args, { db }) =>
      db.Teams.findAll({ order: [["id", "ASC"]] }),
    // Команды в организации
    team: (parent, args, { db }) => {
      return db.Teams.findAll({
        where: { organizationId: args.organizationId }
      });
    },
    notifications: (parent, args, { db }) =>
      db.Notifications.findAll({ order: [["id", "DESC"]] }),
    notification: (parent, args, { db }) =>
      db.Notifications.findOne({ where: { id: args.id } }),

    // Получаем все посты
    posts: async (parent, args, { db }) => {
      let resultOfPosts = db.Posts.findAll({
        order: [["id", "DESC"]],
        include: [{ model: db.LikesOfPosts, as: "likesOfPost" }]
      });
      return resultOfPosts;
    },
    // Получаем информацию о посте по id
    post: (parent, args, { db }) => {
      return db.Posts.findOne({
        where: { id: args.id },
        include: [{ model: db.LikesOfPosts, as: "likesOfPost" }]
      });
    },

    // Получаем информацию о всех лайках постов пользователя
    likesOfPostFromUser: (parent, args, { db }) => {
      return db.LikesOfPosts.findAll({
        where: { userId: args.userId }
      });
    },

    // Получаем информацию о всех лайках комментариев пользователя
    likesOfCommentFromUser: (parent, args, { db }) => {
      return db.LikesOfComments.findAll({
        where: { userId: args.userId }
      });
    },

    getPointsUser: (parent, args, { db }) =>
      db.Points.findOne({ where: { userId: args.userId } }),
    comments: (parent, args, { db }) =>
      db.Comments.findAll({
        order: [["id", "ASC"]]
        // include: [
        //   {
        //     model: db.Users,
        //     as: "author",
        //     attributes: ["name"]
        //   }
        // ]
      }),
    comment: (parent, args, { db }) =>
      db.Comments.findOne({ where: { id: args.id } }),
    usersInTeams: (parent, { teamId }, { db }) =>
      db.UsersInTeams.findAll({
        where: { status: "Принят", teamId: teamId },
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),
    oneUserInTeams: (parent, args, { db }) =>
      db.UsersInTeams.findAll({
        where: { userId: args.userId },
        order: [["id", "ASC"]],
        include: [
          { model: db.Users, as: "user" },
          {
            model: db.Teams,
            as: "team",
            include: [{ model: db.Organizations, as: "organization" }]
          }
        ]
      }),
    raitingInTeams: (parent, { teamId }, { db }) =>
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
    personalUserStatistics: (parent, { userId }, { db }) =>
      db.Points.findOne({
        where: { userId: userId },
        include: [{ model: db.PointsOperations, as: "pointsOperation" }]
      }),
    requests: (parent, { teamId }, { db }) =>
      db.UsersInTeams.findAll({
        where: { status: "Не принят", teamId: teamId },
        order: [["id", "ASC"]],
        include: [{ model: db.Users, as: "user" }]
      }),
    getPointsUser: (parent, args, { db }) =>
      db.Points.findOne({
        where: { userId: args.userId },
        order: [["id", "ASC"]]
      }),
    getOperationPointsUser: (parent, args, { db }) =>
      db.PointsOperations.findAll({
        where: { pointAccountId: args.pointAccountId },
        order: [["id", "ASC"]]
      }),
    pointsLastWeek: async (parent, args, { db }) => {
      let operationLastWeek = await db.PointsOperations.findAll({
        where: {
          pointAccountId: args.id,
          createdAt: {
            [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      });
      let operation2LastWeek = await db.PointsOperations.findAll({
        where: {
          pointAccountId: args.id,
          createdAt: {
            [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            [Op.lt]: new Date(new Date() - 14 * 60 * 60 * 1000)
          }
        }
      });
      let pointsLastWeek = 0;
      for (let i = 0; i < operationLastWeek.length; i++) {
        pointsLastWeek = pointsLastWeek + operationLastWeek[i].delta;
      }
      let points2LastWeek = 0;
      for (let i = 0; i < operation2LastWeek.length; i++) {
        points2LastWeek = points2LastWeek + operation2LastWeek[i].delta;
      }
      return [pointsLastWeek, points2LastWeek];
    },
    tasks: (parent, { teamId }, { db }) =>
      db.Tasks.findAll({
        where: { teamId: teamId, userId: { [Op.ne]: null } },
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
      }),
    allTasks: (parent, { teamId }, { db }) =>
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
      }),
    backlog: (parent, { teamId }, { db }) =>
      db.Tasks.findAll({
        where: { teamId: teamId, userId: null },
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
      })
  },
  Mutation: {
    /* [Ниже] Мутации регистрации и авторизации */
    signUp: async (
      parent,
      { name, birthday, login, password, fingerprint },
      { res, db }
    ) => {
      let hashPassword = bcrypt.hashSync(password, salt);

      // Добавляем данные в БД
      let user = await db.Users.create({
        login,
        name,
        birthday,
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
    logIn: async (parent, { login, password, fingerprint }, { res, db }) => {
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
    updateTokens: async (parent, { fingerprint }, { req, res, db }) => {
      // Получаем refresh-токен из cookie
      let refreshToken = req.cookies.refreshToken;

      // Если он пуст, отправляем ошибку
      if (!refreshToken) {
        return {
          error: {
            errorStatus: 401,
            message: "Refresh token is absent!"
          }
        };
      }
      // Если токен был получен
      else {
        // Ищем запись о сессии
        let session = await db.RefreshSessions.findOne({
          where: {
            refreshToken,
            fingerprint
          }
        });

        // Если сессия не была найдена, отправляем ошибку
        if (!session) {
          return {
            error: {
              errorStatus: 401,
              message: "Session was not found!"
            }
          };
        }
        // Если сессия была найдена, обновляем токены
        else {
          session = session.dataValues;

          // Находим пользователя по ID
          // TODO: оптимизация запросов с помощью Include
          let user = await db.Users.findOne({
            where: {
              id: session.userId
            }
          });

          // Генерируем новые токены
          let tokens = generateTokens(user.dataValues);

          // Записать в Cookie HttpOnly рефреш-токен
          res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
          });

          // Обновляем записи в БД
          updateRefreshSession(
            db,
            session.userId,
            refreshToken,
            tokens.refreshToken,
            fingerprint
          );

          return {
            accessToken: tokens.accessToken
          };
        }
      }
    },

    /*
      [Ниже] Мутации работы с пользователями (Users)     
    */
    createUser: (parent, { name }, { db }) =>
      db.Users.create({
        name: name
      }),
    // Обновляем фамилию, имени, отчества, пола и логина пользователя
    updateUser: (
      parent,
      { surname, name, patricity, gender, login, id },
      { db }
    ) =>
      db.Users.update(
        {
          name: name,
          surname: surname,
          patricity: patricity,
          gender: gender,
          login: login,
          birthday: birthday
        },
        {
          where: {
            id: id
          }
        }
      ),
    // Меняем статус пользователя в команде (добавляем или удаляем)
    addUserInTeam: (parent, { status, id }, { db }) =>
      db.UsersInTeams.update(
        {
          status: status
        },
        {
          where: {
            id: id
          }
        }
      ),
    // Удаляем пользователя
    deleteUser: (parent, args, { db }) =>
      db.Users.destroy({
        where: {
          id: args.id
        }
      }),
    // Обновляем название, описание и максимальное количество пользователей команды
    updateTeam: (parent, { name, description, maxUsersLimit, id }, { db }) =>
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
      [Ниже] Мутации работы с организациями (Organization)     
    */
    createOrganization: (
      parent,
      { name, ownerId, organizationTypeId, maxTeamsLimit },
      { db }
    ) =>
      db.Organizations.create({
        name: name,
        ownerId: ownerId,
        organizationTypeId: organizationTypeId,
        maxTeamsLimit: maxTeamsLimit
      }),
    // Обновляем название и максимальное количество команд организации
    updateOrganization: (parent, { name, maxTeamsLimit, id }, { db }) =>
      db.Organizations.update(
        {
          name: name,
          maxTeamsLimit: maxTeamsLimit
        },
        {
          where: {
            id: id
          }
        }
      ),
    // Удаляем организацию
    deleteOrganization: (parent, args, { db }) =>
      db.Organizations.destroy({
        where: {
          id: args.id
        }
      }),
    deleteTeam: (parent, args, { db }) =>
      db.Teams.destroy({
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
      { db }
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
    //Создать оповещение
    createNotification: (
      parent,
      { body, authorId, teamId, forAllUsers },
      { db }
    ) =>
      db.Notifications.create({
        body: body,
        authorId: authorId,
        teamId: teamId,
        forAllUsers: forAllUsers
      }),
    //Изменить оповещение
    updateNotification: (
      parent,
      { body, teamId, forAllUsers, forAllOrganization, forAllTeam, id },
      { db }
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
    //Удалить оповещение
    deleteNotification: (parent, args, { db }) =>
      db.Notifications.destroy({
        where: {
          id: args.id
        }
      }),
    /*
      [Ниже] Мутации работы с комментариями (Comments)     
    */
    //Создать комментарий
    createComment: (parent, { body, authorId, postId, dateAdd }, { db }) =>
      db.Comments.create({
        body: body,
        authorId: authorId,
        postId: postId,
        dateAdd: dateAdd
      }),
    //Изменить комментарий
    updateComment: (parent, { body, id }, { db }) =>
      db.Comments.update(
        {
          body: body
        },
        {
          where: {
            id: id
          }
        }
      ),
    //Удалить комментарий
    deleteComment: (parent, args, { db }) =>
      db.Comments.destroy({
        where: {
          id: args.id
        }
      }),

    /*
      [Ниже] Мутации работы с постами (Posts)     
    */
    createPost: (parent, { body, authorId, organizationId }, { db }) =>
      db.Posts.create({
        body: body,
        authorId: authorId,
        organizationId: organizationId
      }),
    deletePost: (parent, args, { db }) =>
      db.Posts.destroy({
        where: {
          id: args.id
        }
      }),

    /*
      [Ниже] Мутации работы с лайками постов (LikesOfPosts)     
    */
    addLikeOfPost: (parent, { userId, postId }, { db }) =>
      db.LikesOfPosts.create({
        userId: userId,
        postId: postId
      }),

    deleteLikeOfPost: (parent, { userId, postId }, { db }) =>
      db.LikesOfPosts.destroy({
        where: { userId, postId }
      }),

    /*
      [Ниже] Мутации работы с лайками комментариев (LikesOfComments)     
    */

    addLikeOfComment: (parent, { userId, commentId }, { db }) =>
      db.LikesOfComments.create({
        userId: userId,
        commentId: commentId
      }),

    deleteLikeOfComment: (parent, { userId, commentId }, { db }) =>
      db.LikesOfComments.destroy({
        where: { userId, commentId }
      }),

    // ----- //
    createUserInTeam: (parent, { userId, teamId, status, roleId }, { db }) =>
      db.UsersInTeams.create({
        userId: userId,
        teamId: teamId,
        status: status,
        roleId: roleId
      }),
    deleteUserInTeam: (parent, args, { db }) =>
      db.UsersInTeams.destroy({
        where: {
          id: args.id
        }
      }),
    /*
      [Ниже] Мутации работы с баллами (PointsOperstion)     
    */
    //Изменить операцию с баллами (если ввели неправильное число баллов, его можно исправить)
    updatePointOperation: (parent, { pointAccountId, delta, id }, { db }) =>
      db.PointsOperations.update(
        {
          pointAccountId: pointAccountId,
          delta: delta
        },
        {
          where: {
            id: id
          }
        }
      ),
    //Напрямую изменить количество баллов у конкретного пользователя
    updatePoints: (parent, { pointQuantity, id }, { db }) =>
      db.PointsOperations.update(
        {
          pointQuantity: pointQuantity
        },
        {
          where: {
            id: id
          }
        }
      ),
    //Удалить операцию с баллами
    deletePointOperation: (parent, args, { db }) =>
      db.PointsOperations.destroy({
        where: {
          id: args.id
        }
      }),
    //Удалить счет пользователя
    deletePoints: (parent, args, { db }) =>
      db.Points.destroy({
        where: {
          id: args.id
        }
      }),
    /*
      [Ниже] Мутации работы с заявками на вхождение в команду     
    */
    acceptRequst: (parent, { id }, { db }) =>
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

    revokeRequst: (parent, { id }, { db }) =>
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
    rejectRequst: (parent, { id }, { db }) =>
      db.UsersInTeams.update(
        {
          status: "Отклонен"
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
      { db }
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

    /*
      [Ниже] Мутации работы с задачами     
    */
    createTask: (
      parent,
      { teamId, userId, header, text, points, status },
      { db }
    ) =>
      db.Tasks.create({
        teamId: teamId,
        userId: userId,
        body: { header: header, text: text, points: points },
        status: status
      }),
    updateTask: (parent, { id, status }, { db }) =>
      db.Tasks.update(
        {
          status: status
        },
        {
          where: {
            id: id
          }
        }
      ),
    addUserToTask: (parent, { id, userId }, { db }) =>
      db.Tasks.update(
        {
          userId: userId
        },
        {
          where: {
            id: id
          }
        }
      ),
    deleteTask: (parent, args, { db }) =>
      db.Tasks.destroy({
        where: {
          id: args.id
        }
      }),
    logOut: async (parent, { fingerprint }, { db, req, res }) => {
      // Получаем refresh-токен из cookie
      let refreshToken = req.cookies.refreshToken;
      if (refreshToken != null) {
        // res.cookie.set("refreshToken", { httpOnly: true, expires: Date.now() });
        // Очищаем куки с токеном
        res.clearCookie("refreshToken");

        // Удаляем записи о сессии
        let result = await db.RefreshSessions.destroy({
          where: {
            refreshToken,
            fingerprint
          }
        });
        return result;
      } else {
        return 0;
      }
    }
  }
};
