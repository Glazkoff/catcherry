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
    usersInNewTeams: (parent, args, { db }) =>
      db.UsersInTeams.findAll({ order: [["id", "ASC"]] }),
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

    // Получение всех оповещений
    notifications: async (parent, args, { db }) => {
      let result = await db.Notifications.findAll({
        order: [["id", "DESC"]],
        include: [{ model: db.ReadNotification, as: "ReadOrNot" }]
      });
      return result;
    },

    // Получение непрочитанных оповещений для конкртеного пользователя
    notificationsForUser: async (parent, args, { db }) => {
      let result = await db.Notifications.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: db.ReadNotification,
            as: "ReadOrNot",
            where: { userId: args.userId, readOrNot: false }
          },
          {
            model: db.Users,
            as: "notificationAuthor"
          }
        ],
        where: {
          userId: {
            [Op.contains]: Number(args.userId)
          }
        }
      });
      return result;
    },

    // Получаем все посты
    posts: async (parent, args, { db }) => {
      let resultOfPosts = await db.Posts.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: db.LikesOfPosts,
            as: "likesOfPost"
          }
        ],
        where: {
          userId: {
            [Op.contains]: Number(args.userId)
          }
        }
      });
      // console.log("Hurray!!! ", JSON.stringify(resultOfPosts));
      return resultOfPosts;
    },

    // Получаем информацию о посте по id
    post: async (parent, args, { db }) => {
      let resultOfPost = await db.Posts.findOne({
        where: {
          id: args.id,
          userId: {
            [Op.contains]: Number(args.userId)
          }
        },
        include: [{ model: db.LikesOfPosts, as: "likesOfPost" }]
      });
      // console.log("Hurray!!! ", JSON.stringify(resultOfPost));
      return resultOfPost;
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
    roles: (parent, args, { db }) => {
      return db.Roles.findAll({});
    },

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

    // Получение баллов и информации о них для пользователя по id
    getPointsUser: async (parent, args, { db }) => {
      let resultPoints = await db.Points.findOne({
        where: { userId: args.userId }
      });
      let resultPointsOperation = await db.PointsOperations.findAll({
        where: { pointAccountId: resultPoints.id },
        order: [["id", "DESC"]],
        limit: +args.limit == 0 ? undefined : args.limit
      });

      resultPoints.userPointsOperation = resultPointsOperation;

      return resultPoints;
    },

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
    allTasksInOneTeam: (parent, { teamId }, { db }) =>
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
    allUserTasks: (parent, { id }, { db }) =>
      db.Tasks.findAll({
        where: {
          [Op.or]: [{ userId: id }, { userId: null }]
        },
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
      { input }, //{ name, surname, patricity, birthday, login, password, fingerprint },
      { res, db }
    ) => {
      let hashPassword = bcrypt.hashSync(input.password, salt);

      if ("" + input.birthday == "") {
        input.birthday = null;
      }

      // Добавляем данные в БД
      let user = await db.Users.create({
        login: input.login,
        name: input.name,
        surname: input.surname,
        patricity: input.patricity,
        birthday: input.birthday,
        password: hashPassword
      });

      // Добавляем кошелёк для баллов
      await db.Points.create({
        userId: user.dataValues.id
      });

      // Добавляем оповещение новому пользователю
      let result = await db.Notifications.create({
        body: {
          header: "Добро пожаловать в Catcherry!",
          text: "Рады, что Вы с нами!"
        },
        typeId: 1,
        authorId: user.dataValues.id,
        userId: [user.dataValues.id],
        endTime: user.dataValues.createdAt
      });
      await db.ReadNotification.create({
        notificationId: result.id,
        userId: user.dataValues.id,
        readOrNot: false
      });

      // Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      let tokens = generateTokens(user.dataValues);

      // Добавляем сессию в БД
      await addRefreshSession(
        db,
        user.dataValues.id,
        tokens.refreshToken,
        input.fingerprint
      );

      // Записать в Cookie HttpOnly рефреш-токен
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN
      });
      return tokens;
    },
    logIn: async (parent, { input }, { res, db }) => {
      // Сравниваем логин с БД, если нет - ошибка
      let user = await db.Users.findOne({
        where: {
          login: input.login,
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
      } else if (bcrypt.compareSync(input.password, user.password)) {
        // Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
        let tokens = generateTokens(user.dataValues);
        // Добавляем сессию в БД
        await addRefreshSession(
          db,
          user.dataValues.id,
          tokens.refreshToken,
          input.fingerprint
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
    updateUser: async (
      parent,
      { input, id }, //{ surname, name, patricity, gender, login, id, birthday },
      { db }
    ) => {
      if ("" + input.birthday == "") {
        input.birthday = null;
      }
      let resUpdate = await db.Users.update(
        {
          name: input.name,
          surname: input.surname,
          patricity: input.patricity,
          gender: input.gender,
          login: input.login,
          birthday: input.birthday,
        },
        {
          where: {
            id: id
          }
        }
      );
      return resUpdate;
    },
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
    addUserInNewTeam: (parent, { id, userId }, { db }) =>
      db.UsersInTeams.create({
        userId: userId,
        teamId: id,
        status: "Принят",
        roleId: 10
      }),
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
    createNotification: async (
      parent,
      { body, typeId, authorId, userId, endTime },
      { db }
    ) => {
      let result;
      result = await db.Notifications.create({
        body: body,
        typeId: typeId,
        authorId: authorId,
        userId: userId,
        endTime: endTime
      });
      userId.forEach(element => {
        db.ReadNotification.create({
          notificationId: result.id,
          userId: element,
          readOrNot: false
        });
      });
      return result;
    },

    // Поменять статус оповещения на "Прочитано"
    updateNotification: (
      parent,
      { notificationId, userId, checkNotification },
      { db }
    ) =>
      db.ReadNotification.update(
        {
          readOrNot: checkNotification
        },
        {
          where: {
            notificationId: notificationId,
            userId: userId
          }
        }
      ),

    //Удалить оповещение
    deleteNotification: (parent, args, { db }) => {
      let result = db.Notifications.destroy({
        where: {
          id: args.id
        }
      });
      db.ReadNotification.destroy({
        where: {
          notificationId: args.id
        }
      });
      return result;
    },

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
    createPost: (parent, { body, authorId, userId }, { db }) =>
      db.Posts.create({
        body: body,
        authorId: authorId,
        userId: userId
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

    // Добавление  баллов
    createPointOperation: async (
      parent,
      { userId, delta, operationDescription },
      { db }
    ) => {
      let total = await db.Points.findOne({
        where: { userId: userId }
      });
      await db.Points.update(
        {
          pointQuantity: +total.pointQuantity + delta
        },
        {
          where: {
            userId: userId
          }
        }
      );
      let creation = await db.PointsOperations.create({
        pointAccountId: total.id,
        delta: delta,
        operationDescription: operationDescription
      });
      return creation;
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
    updateStatusTask: (parent, { id, status }, { db }) =>
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
