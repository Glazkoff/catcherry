module.exports = `
directive @rateLimit(
  max: Int,
  window: String,
  message: String,
  identityArgs: [String],
  arrayLengthField: String
) on FIELD_DEFINITION

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
  surname: String
  patricity: String
  gender: String
  birthday: String
  login: String
  password: String
  createdAt: String
  updatedAt: String
  deletedAt: String
}

type Organization {
  id: ID!
  name: String!
  ownerId: Int
  organizationTypeId: Int
  maxTeamsLimit: Int
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
  users: [User!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  user(id: ID!): User @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  organizations: [Organization!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  organization(id: ID!): Organization @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  teams: [Team!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  team(organizationId: Int): Team @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  notifications: [Notification]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  notification(id: ID!): Notification @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  usersInTeams:[UserInTeam]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  requests:[UserInTeam] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  getPointsUser(userId: Int!): PointsUser @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  getOperationPointsUser(userId: Int!): [PointOperations] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
}

type Mutation {
  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateTokens(fingerprint:String!): jwt!

  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, surname: String, name: String, patricity: String, gender: String, login: String): [Int]!
  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): Organization!
  updateOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): [Int]!
  deleteOrganization(id: ID!): Int!

  createTeam(organizationId: Int, name: String!, description: String, maxUsersLimit: Int): Team!
  createUserInTeam(userId: ID!, teamId: ID!, status: String!,  roleId: ID!): UserInTeam!
  deleteUserInTeam(id: ID!): Int!

  acceptRequest(id: ID!): [Int]!
  createPointOperation(pointAccountId: Int!, delta: Int!): PointsUser!
  deletePointOperation(id: ID!): Int!
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!
}
`;

// FIXME: удалить createUser / заменить на signUp
