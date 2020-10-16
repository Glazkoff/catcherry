module.exports = `
type User {
  id: ID!
  name: String!
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
  users: [User]! 
  user(id: ID!): User
  
  notifications: [Notification]!
  notification(id: ID!): Notification
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!

  signUp(username: String!, email: String!, password: String!): String
  logIn(email: String!, password: String!): String

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!
}
`;

// FIXME: удалить createUser / заменить на signUp
