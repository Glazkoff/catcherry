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
  userPoints: PointsUser
  password: String
  createdAt: String
  updatedAt: String
  deletedAt: String
  userInTeam: UserInTeam
}

type Organization {
  id: ID!
  name: String!
  ownerId: Int
  owner: User
  organizationTypeId: Int
  maxTeamsLimit: Int
  organizationType: OrganizationType
  createdAt: String! 
  updatedAt: String!
  teams: [Team]
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
  button: String
  buttonLink: String
}

type Notification {
  id: ID!
  body: BodyNotification!
  authorId: Int!
  teamId: Int!
  forAllUsers: Int
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
  createdAt: String
}

type Post {
  id: ID!
  body: BodyPost!
  authorId: Int!
  organizationId: Int!
  commentsByPost: [Comment]
  forAllTeam: Boolean
  createdAt: String!
  updatedAt: String!
}

type LikeOfPost {
  id: ID!
  userId: ID!
  postId: ID!
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
  tasksUser: User
  createdAt: String
}

type bodyTask {
  header: String
  text: String!
  points: Int
}

input PostBody {
  header: String!
  text: String!
}

type BodyPost {
  header: String!
  text: String!
}

type Author{
  name: String!
}
type Comment {
  id: ID!
  body: String!
  authorId: Int!
  author: Author
  postId: Int!
  createdAt: String!
  updatedAt: String!
}

type Query { 
  users: [User!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  user(id: ID!): User @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  deletedUsers: [User!]

  teams: [Team!]
  team(organizationId: Int): [Team]
  
  comments: [Comment]!
  comment(id: ID!): Comment

  organizations: [Organization!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  organization(id: ID!): Organization @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  organizationTypes: [OrganizationType!]
  
  notifications: [Notification]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  notification(id: ID!): Notification @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  requests(teamId:ID!):[UserInTeam] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  getPointsUser(userId: Int!): PointsUser @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  getOperationPointsUser(userId: Int!): [PointOperations] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  posts: [Post]!
  post(id: ID!): Post
  
  usersInTeams (teamId:ID!):[UserInTeam]!
  oneUserInTeams(userId: ID!): [UserInTeam!]
  raitingInTeams (teamId:ID!): [UserInTeam]!
  personalUserStatistics(userId: Int!): PointsUser
  teamsInOneOrganization(organizationId: ID!): [Team]

  tasks (teamId:ID!): [Task]!
  backlog (teamId:ID!): [Task]!

  statisticsNewUsers: Int
  statisticsNewOrgs: Int
  statisticsDeleteUsers: Int
  statisticsDeleteOrgs: Int
}

type Mutation {
  signUp(name: String!, login: String!, password: String!, fingerprint:String!): jwt
  logIn(login: String!, password: String!, fingerprint:String!): jwt
  updateTokens(fingerprint:String!): jwt!
  logOut(fingerprint:String!): Int

  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, surname: String, name: String, patricity: String, gender: String, login: String): [Int]!
  deleteUserFromTeam(id: ID!): [Int]!

  createNotification(body: NotificationBody!, authorId: Int!, teamId: Int!, forAllUsers: Int): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(body: NotificationBody!, id: ID!, teamId: Int!, forAllUsers: Int, forAllOrganization: Boolean, forAllTeam: Boolean): [Int]!

  createPost(body: PostBody!, authorId: Int!, organizationId: Int!): Post!
  deletePost(id: ID!): Int!

  createComment(body: String!, authorId: Int!, postId: Int!): Comment!
  deleteComment(id: ID!): Int!
  updateComment(body: String!, id: ID!): [Int]!
  
  updateOrganization(id: ID, name: String, maxTeamsLimit: Int): [Int]!
  deleteOrganization(id: ID!): Int!

  createOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int, id: ID!): Organization!
  addUserInTeam(status: String!, id: ID!): [Int]!

  createTeam(organizationId: Int, name: String!, description: String, maxUsersLimit: Int): Team!
  createUserInTeam(userId: ID!, teamId: ID!, status: String!,  roleId: ID!): UserInTeam!
  deleteTeam(id: ID!): Int!
  deleteUserInTeam(id: ID!): Int!
  updateTeam(id:ID!, name: String, description:String, maxUsersLimit: Int):[Int]!
  
  acceptRequst(id: ID!): [Int]!
  revokeRequst(id: ID!): [Int]!
  rejectRequst(id: ID!): [Int]!

  createPointOperation(pointAccountId: Int!, delta: Int!, operationDescription: String!): PointsUser!	 
  deletePointOperation(id: ID!): Int!	
  deletePoints(id: ID!): Int!
  updatePoints(id: ID!, pointQuantity: Int!): [Int]!
  updatePointOperation(id: ID!, pointAccountId: Int!, delta: Int!): [Int]!

  createTask(teamId: ID, userId: ID, header: String, text: String, points: Int, status: String): Task!
  updateTask(id: ID!, status: String): Task!
  addUserToTask(id: ID!, userId: ID): Task!
  deleteTask(id: ID!): Int!
}
`;

// FIXME: Исправить в схеме или удалить
// team(organizationId: Int): [Team]

// FIXME: Неизвестно, что оставлять
// updateOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): [Int]!

// FIXME: удалить createUser / заменить на signUp
