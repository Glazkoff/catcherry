function generateTokens(user) {
  // TODO: Никита
  // TODO: Функция генерации токенов (принмает данные, которые мы заносим в токен )
  // TODO: генерируем рефреш-токен
  // TODO: генерируем JWT токен (в токен заносим общедоступные данные)
  // TODO: записать в Cookie HttpOnly рефреш-токен
  // TODO: возвращать объект с двумя полями (refreshToken, authToken)
  return {
    refreshToken: "refreshToken",
    authToken: "refreshToken",
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
    logIn: async (parent, args, { db }, info) => {
      // TODO: Никита
      // TODO: сравниваем логин с БД, если нет - ошибка
      // TODO: проверяем через bcrypt пароль, не совпадает - ошибка
      // TODO: Вызываем функцию generateTokens(user) генерации токенов (возвращает объект с двумя токенами)
      // TODO: отправить в ответ оба токен
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
