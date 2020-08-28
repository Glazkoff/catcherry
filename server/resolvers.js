module.exports = {
  Query: {
    users: (parent, args, { db }, info) => db.users.findAll(),
  },
  Mutation: {
    createUser: (parent, { name }, { db }, info) =>
      db.users.create({
        name: name,
      }),
    // updateUser: (parent, { name, id }, { db }, info) =>
    //   db.users.update(
    //     {
    //       name: name,
    //     },
    //     {
    //       where: {
    //         id: id,
    //       },
    //     }
    //   ),
    // deleteUser: (parent, { id }, { db }, info) =>
    //   db.users.destroy({
    //     where: {
    //       id: id,
    //     },
    //   }),
  },
};
