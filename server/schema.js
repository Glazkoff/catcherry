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

type Team {
  id: ID!
  organizationId: Int
  name: String!
  description: String
  maxUsersLimit: Int
  createdAt: String!
  updatedAt: String!
}

type UserInTeam {
  id: ID!
  userId: ID!
  teamId: ID!
  status: String!
  roleId: ID!
  user:User!
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

type Query { 
  users: [User!] 
  user(id: ID!): User
  
  notifications: [Notification]!
  notification(id: ID!): Notification

  getPointsUser(userId: Int!): PointsUser
  getOperationPointsUser(pointAccountId: Int!): [PointOperations]
  
  teams: [Team!]
  team(organizationId: Int): Team

  usersInTeams (teamId:ID!):[UserInTeam]!

  requests (teamId:ID!):[UserInTeam]
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, id: ID!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createUserInTeam(userId: ID!, teamId: ID!, status: String!,  roleId: ID!): UserInTeam!
  deleteUserInTeam(id: ID!): Int!

  acceptRequst(id: ID!): [Int]!
  revokeRequst(id: ID!): [Int]!

  updatePointsUser(id:ID!, pointQuantity: Int!): [Int]!
  createPointOperation(pointAccountId: Int!, delta: Int!): PointsUser!	 
  deletePointOperation(id: ID!): Int!	
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!

  signUp(name: String!, login: String!, password: String!): jwt
  logIn(login: String!, password: String!): jwt
  updateAccessToken: jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp
