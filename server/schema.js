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
  createdAt: String!
  updatedAt: String!
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

  organizations: [Organization!]
  organization(id: ID!): Organization

  teams: [Team!]
  team(organizationId: Int): Team
  
  notifications: [Notification]!
  notification(id: ID!): Notification
}

type Mutation {
  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(name: String!, surname: String, patricity: String, gender: String, birthday: String, login: String, id: ID!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): Organization!
  updateOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): [Int]!
  deleteOrganization(id: ID!): Int!

  createTeam(organizationId: Int, name: String!, description: String, maxUsersLimit: Int): Team!

  signUp(name: String!, login: String!, password: String!): jwt
  logIn(login: String!, password: String!): jwt
  updateAccessToken: jwt!
}
`;

// FIXME: удалить createUser / заменить на signUp
