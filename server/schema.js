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
  checkNotification: Boolean
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

  organizations: [Organization!]
  organization(id: ID!): Organization

  teams: [Team!]
  team(organizationId: Int): Team
  
  notifications: [Notification]!
  notification(id: ID!): Notification

  usersInTeams:[UserInTeam]!

  requests:[UserInTeam]
  getPointsUser(userId: Int!): PointsUser
  getOperationPointsUser(userId: Int!): [PointOperations]
}

type Mutation {
  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateAccessToken(fingerprint:String!): jwt!

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
