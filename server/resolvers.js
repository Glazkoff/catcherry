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
      db.Notifications.findOne({ where: { id: args.id } })
  },
  Mutation: {
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
    updateNotification: (parent, { body, teamId, forAllUsers, forAllOrganization, forAllTeam, id }, { db }, info) =>
      db.Notifications.update(
        {
          body: body,
          teamId: teamId,
          forAllUsers: forAllUsers,
          forAllOrganization: forAllOrganization,
          forAllTeam:forAllTeam,
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
  },
};
