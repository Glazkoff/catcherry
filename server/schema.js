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
  createdAt: String
  updatedAt: String
  surname: String
  patricity: String
  birthday: String
  gender: String
  deletedAt: String
}
type Teams {
  id: ID!
  organizationId: ID,
  name: String
  description: String
  maxUsersLimit: Int
}
type OrganizationType {
  id: ID!
  name: String
}
type Organization {
  id: ID!
  name: String!
  organizationType: OrganizationType
  ownerId: Int
  owner: User
  organizationTypeId: Int
  maxTeamsLimit: Int
  createdAt: String!
  updatedAt: String!
  teams: [Teams]
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

  teams: [Teams] 

  organizations: [Organization!]
  organization(id: ID!): Organization
  
  notifications: [Notification]!
  notification(id: ID!): Notification
}
type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, surname: String, name: String, patricity: String, gender: String, login: String): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  deleteOrganization(id: ID!): Int!
  updateOrganization(id: ID!, name: String): [Int]!



  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateTokens(fingerprint:String!): jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp