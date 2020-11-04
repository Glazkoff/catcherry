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
type PointsUser{
  id: ID!
  userId: Int!
  pointQuantity: Int!
  createdAt: String!
  updatedAt: String!
}
type PointOperations{
  id: ID!
  pointAccountId: Int!
  delta: Int!
  operationDescription: String
}

input PostBody {
  header: String!
  text: String!
}
type BodyPost {
  header: String!
  text: String!
}
type Post {
  id: ID!
  body: BodyPost!
  authorId: Int!
  organizationId: Int!
  forAllTeam: Boolean
  createdAt: String!
  updatedAt: String!
}

type Query { 
  users: [User!] 
  user(id: ID!): User
  
  notifications: [Notification]!
  notification(id: ID!): Notification

  posts: [Post]!
  post(id: ID!): Post

  getPointsUser(userId: Int!): PointsUser
  getOperationPointsUser(userId: Int!): [PointOperations]
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createPost(body: PostBody!, authorId: Int!, organizationId: Int!): Post!
  deletePost(id: ID!): Int!

  createPointOperation(pointAccountId: Int!, delta: Int!): PointsUser!
  deletePointOperation(id: ID!): Int!
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!

  signUp(name: String!, login: String!, password: String!): jwt
  logIn(login: String!, password: String!): jwt
  updateAccessToken: jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp
