module.exports = {
  Query: {
    users: (parent, args, { db }, info) =>
      db.users.findAll({ order: [["id", "ASC"]] }),
    user: (parent, args, { db }, info) => {
      return db.users.findOne({ where: { id: args.id } });
    },
  },
  Mutation: {
    createUser: (parent, { name }, { db }, info) =>
      db.users.create({
        name: name,
      }),
    updateUser: (parent, { name, id }, { db }, info) =>
      db.users.update(
        {
          name: name,
        },
        {
          where: {
            id: id,
          },
        }
      ),
    deleteUser: async (parent, args, { db }, info) =>
      db.users.destroy({
        where: {
          id: args.id,
        },
      }),
  },
};
