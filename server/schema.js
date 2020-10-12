module.exports = `
type LogInTokens {
  refreshToken: String!
  accessToken: String!
}

type User {
  id: ID!
  name: String!
  login: String!
  password: String!
  createdAt: String!
  updatedAt: String!
}

type Query { 
  users: [User]! 
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!

  signUp(username: String!, email: String!, password: String!): String
  logIn(login: String!, password: String!): LogInTokens
}
`;

// FIXME: удалить createUser / заменить на signUp
