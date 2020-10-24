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
  name: String
  login: String
  password: String
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
  
  notifications: [Notification]!
  notification(id: ID!): Notification
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateAccessToken: jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp
