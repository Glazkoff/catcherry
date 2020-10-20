module.exports = `
type Error {
  errorStatus: Int!
  message: String!
}

type jwt {
  error: Error
  refreshToken: String
  accessToken: String
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

  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateAccessToken: jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp
