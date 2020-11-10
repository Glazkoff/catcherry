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
  userPoints: PointsUser
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
  owner: User!
  organizationType: OrganizationType!
  createdAt: String! 
  updatedAt: String!
}

type OrganizationType {
  id: ID!
  name: String!
}

type Team {
  id: ID!
  organizationId: Int
  name: String!
  description: String
  maxUsersLimit: Int
<<<<<<< HEAD
  organization: Organization
=======
  team: [UserInTeam]
>>>>>>> team-members-feature
  createdAt: String!
  updatedAt: String!
}

type UserInTeam {
  id: ID!
  userId: ID!
  teamId: ID!
  status: String!
  roleId: ID!
  user: User!
<<<<<<< HEAD
  team: Team!
=======
>>>>>>> team-members-feature
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
  pointsOperation: [PointOperations]
  createdAt: String!
  updatedAt: String!
}
type PointOperations{
  id: ID!
  pointAccountId: Int!
  delta: Int!
  operationDescription: String
}

type Task {
  id: ID!
  teamId: ID!
  userId: ID
  body: bodyTask!
  status: String
  tasksTeam: Team!
  tasksUser: User!
  createdAt: String
}

type bodyTask {
  header: String
  text: String!
  points: Int
}

type Query { 
  users: [User!] 
  user(id: ID!): User

  organizations: [Organization!]
  organization(id: ID!): Organization

  organizationTypes: [OrganizationType!]

  teams: [Team!]
  team(organizationId: Int): [Team!]

  usersInTeams: [UserInTeam!]
  oneUserInTeams(userId: ID!): [UserInTeam!]
  requests:[UserInTeam]
  
  notifications: [Notification]!
  notification(id: ID!): Notification

  getPointsUser(userId: Int!): PointsUser
  getOperationPointsUser(pointAccountId: Int!): [PointOperations]!
  
  usersInTeams (teamId:ID!):[UserInTeam]!
  raitingInTeams (teamId:ID!): [UserInTeam]!
  requests (teamId:ID!):[UserInTeam]

  tasks (teamId:ID!): [Task]!
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

  updateTeam(id:ID!, name: String, description:String, maxUsersLimit: Int):[Int]!

  acceptRequst(id: ID!): [Int]!
  revokeRequst(id: ID!): [Int]!

  updatePointsUser(id:ID!, pointQuantity: Int!): [Int]!
  createPointOperation(pointAccountId: Int!, delta: Int!, operationDescription: String!): PointsUser!	 
  deletePointOperation(id: ID!): Int!	
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!

<<<<<<< HEAD
  createUserInTeam(userId: ID!, teamId: ID!, status: String!, roleId: ID!): UserInTeam!
  deleteUserInTeam(id: ID!): Int!

  signUp(name: String!, login: String!, password: String!): jwt
  logIn(login: String!, password: String!): jwt
  updateAccessToken: jwt!
=======
  createTask(userId: ID, header: String, text: String, points: Int, status: String): Task!
  updateTask(id: ID!, status: String): Task!
>>>>>>> team-members-feature
}
`;

// FIXME: удалить createUser / заменить на signUp
