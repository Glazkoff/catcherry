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
      // TODO: добавить резолвер signup
      return "DO SIGN UP PLEASE";
    },
    logIn: async (parent, args, { db }, info) => {
      // TODO: добавить резолвер login
      return "DO LOG IN PLEASE";
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
