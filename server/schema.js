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
  userInTeam: UserInTeam
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
  teams: [Team]
}

type Team {
  id: ID!
  organizationId: Int
  name: String!
  description: String
  maxUsersLimit: Int
  organization: Organization
  team: [UserInTeam]
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
  team: Team!
  role: Role
  createdAt: String!
  updatedAt: String!
}

type Role {
  id: ID!
  name: String
  description: String
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
  deletedUsers: [User!]

  organizationTypes: [OrganizationType!]

  organizations: [Organization!]
  organization(id: ID!): Organization

  teams: [Team!]
  team(organizationId: Int): Team
  
  notifications: [Notification]!
  notification(id: ID!): Notification

  oneUserInTeams(userId: ID!): [UserInTeam!]
  teamsInOneOrganization(organizationId: ID!): [Team]
  posts: [Post]!
  post(id: ID!): Post

  getPointsUser(userId: ID!): PointsUser
  getOperationPointsUser(pointAccountId: Int!): [PointOperations]!
  
  usersInTeams (teamId:ID!):[UserInTeam]!
  raitingInTeams (teamId:ID!): [UserInTeam]!
  requests (teamId:ID!):[UserInTeam]

  tasks (teamId:ID!): [Task]!

  statisticsNewUsers: Int
  statisticsNewOrgs: Int
  statisticsDeleteUsers: Int
  statisticsDeleteOrgs: Int
}

type Mutation {
  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateAccessToken(fingerprint:String!): jwt!

  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, surname: String, name: String, patricity: String, gender: String, login: String): [Int]!
  deleteUserFromTeam(id: ID!, ): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Boolean, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createPost(body: PostBody!, authorId: Int!, organizationId: Int!): Post!
  deletePost(id: ID!): Int!
  
  updateOrganization(id: ID, name: String, maxTeamsLimit: Int): [Int]!
  deleteOrganization(id: ID!): Int!
  updateTeam(id: ID!, name: String, description: String, maxUsersLimit: Int): [Int]!

  updateTokens(fingerprint:String!): jwt!
  createOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int, id: ID!): Organization!
  addUserInTeam(status: String!, id: ID!): [Int]!

  createTeam(organizationId: Int, name: String!, description: String, maxUsersLimit: Int): Team!
  createUserInTeam(userId: ID!, teamId: ID!, status: String!,  roleId: ID!): UserInTeam!
  deleteTeam(id: ID!): Int!
  deleteUserInTeam(id: ID!): Int!

  acceptRequst(id: ID!): [Int]!
  revokeRequst(id: ID!): [Int]!

  updatePointsUser(id:ID!, pointQuantity: Int!): [Int]!
  createPointOperation(pointAccountId: Int!, delta: Int!, operationDescription: String!): PointsUser!	 
  deletePointOperation(id: ID!): Int!	
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!

  createTask(userId: ID, header: String, text: String, points: Int, status: String): Task!
  updateTask(id: ID!, status: String): Task!
}
`;

// FIXME: удалить createUser / заменить на signUp
