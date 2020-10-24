module.exports = `
scalar Date

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
  name: String
  login: String
  password: String
  surname: String
  patricity: String
  birthday: String
  gender: String
  deleteAt: Int
  createdAt: String!
  updatedAt: String!
}
input NotificationBody {
  header: String!
  text: String!
}
type BodyNotification {
  header: String!
  text: String!
}
type Notification {
  id: ID!
  body: BodyNotification!
  authorId: Int!
  teamId: Int!
  forAllUsers: Boolean
  forAllOrganization: Boolean
  forAllTeam: Boolean
  createdAt: String!
  updatedAt: String!
}
type Query { 
  users: [User!] 
  user(id: ID!): User
  deletedUsers: [User!]
  
  notifications: [Notification]!
  notification(id: ID!): Notification
}
type Mutation {
  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateTokens(fingerprint:String!): jwt!

  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, surname: String!, name: String!, patricity: String, gender: String!, login: String!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!
}
`;

// FIXME: удалить createUser / заменить на signUp
