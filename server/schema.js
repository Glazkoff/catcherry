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
  roleInSystem: String
}

type UserInNewTeam {
  id: ID!
  userId: ID
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
  user: User
  team: Team!
  roleId: ID!
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
  button: String
  buttonLink: String
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
  typeId: Int!
  authorId: Int
  notificationAuthor: User
  userId: [Int]
  ReadOrNot: [UserReadNotification]
  endTime: String!
  createdAt: String!
  updatedAt: String!
}

type UserReadNotification {
  userId: ID!
  notificationId: ID!
  readOrNot: Boolean!
}

type TeamIdForNotification {
  teamId: ID!
}

type UserIdForNotification {
  userId: ID!
}

type PointsUser{
  id: ID!
  userId: Int!
  pointQuantity: Int
  userPointsOperation: [PointOperations]
  createdAt: String!
  updatedAt: String!
}

type PointOperations{
  id: ID!
  delta: Int!
  pointAccountId: ID!
  operationDescription: String!
  createdAt: String!
}

type Post {
  id: ID!
  body: BodyPost!
  authorId: Int!
  userId: [Int]
  likesOfPost: [LikeOfPost]
  createdAt: String!
  updatedAt: String!
}

type LikeOfPost {
  userId: ID!
  postId: ID!
}

type LikeOfComment {
  userId: ID!
  commentId: ID!
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
input CommentBody {
  header: String!
  text: String!
}

type BodyComment {
  header: String!
  text: String!
}
type Comment {
  id: ID!
  body: BodyComment!
  authorId: Int!
  postId: Int!
  dateAdd: String!
  createdAt: String!
  updatedAt: String!
}

type Query { 
  isLoginUsed(login: String!): Boolean! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  users: [User!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  user(id: ID!): User @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  deletedUsers: [User!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  teams: [Team!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  team(organizationId: Int): [Team] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  oneTeam(id: ID): Team @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  managerTeams(userId: ID!): [UserInTeam] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  comments: [Comment]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  comment(id: ID!): Comment @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  organizations: [Organization!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  organization(id: ID!): Organization @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  userOrganization(id: ID!): Organization
  organizationTypes: [OrganizationType!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  notifications: [Notification]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  notificationsForUser(userId: ID!): [Notification]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  requests (teamId:ID!):[UserInTeam] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  getOperationPointsUser(pointAccountId: ID!): [PointOperations] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  pointsLastWeek(id: ID!): [Int] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  getPointsUser(userId: ID!, limit: Int): PointsUser @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  
  posts(userId: ID!): [Post]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  post(id: ID!, userId: ID!): Post @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  
  likesOfPostFromUser (userId:ID!): [LikeOfPost]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  likesOfCommentFromUser (userId:ID!): [LikeOfComment]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  usersInTeams (teamId:ID!):[UserInTeam]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  oneUserInTeams(userId: ID!): [UserInTeam!] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  raitingInTeams (teamId:ID!): [UserInTeam]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  personalUserStatistics(userId: Int!): PointsUser @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  teamsInOneOrganization(organizationId: ID!): [Team] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  tasks (teamId:ID!): [Task]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  backlog (teamId:ID!): [Task]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  roles: [Role] @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  role(id: ID!): Role @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  allTasks(teamId:ID!): [Task]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  allTasksInOneTeam(teamId:ID!): [Task]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  allUserTasks(id:ID!): [Task]! @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  statisticsNewUsers: Int @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  statisticsNewOrgs: Int @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  statisticsDeleteUsers: Int @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")
  statisticsDeleteOrgs: Int @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

  usersInNewTeams: Team @rateLimit(window: "1s", max: 5, message: "You are doing that too often.")

}

input signUpInput {
  name: String! @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  surname: String @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  patricity: String @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  birthday: String
  login: String!
  password: String! @constraint(minLength: 6)
  fingerprint:String!
}

input loginInput {
  login: String!
  password: String! @constraint(minLength: 6)
  fingerprint:String!
}

input updateUserInput {
  name: String! @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  surname: String! @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  patricity: String! @constraint(pattern: "^[а-яёА-ЯЁa-zA-Z ]*$")
  gender: String
  birthday: String
  login: String!
}

type Mutation {
  signUp(input: signUpInput): jwt
  logIn(input: loginInput): jwt
  updateTokens(fingerprint:String!): jwt!
  logOut(fingerprint:String!): Int

  createUser(name: String!): User!
  deleteUser(id: ID!): Int!
  updateUser(id: ID!, input: updateUserInput): [Int]!
  deleteUserFromTeam(id: ID!): [Int]!

  createNotification(body: NotificationBody!, typeId:Int!, authorId: Int!, userId: [Int], endTime: String! ): Notification!
  deleteNotification(id: ID!): Int!
  updateNotification(notificationId: ID!, userId: ID! checkNotification: Boolean): [Int]!

  createPost(body: PostBody!, authorId: Int!, userId: [Int]): Post!
  deletePost(id: ID!): Int!
 
  addLikeOfPost(userId: ID!, postId: ID!): LikeOfPost!
  deleteLikeOfPost(userId: ID!, postId: ID!): Int!

  addLikeOfComment(userId: ID!, commentId: ID!): LikeOfComment!
  deleteLikeOfComment(userId: ID!, commentId: ID!): Int!

  createComment(body: CommentBody!, authorId: Int!, postId: Int!, dateAdd: String!): Comment!
  deleteComment(id: ID!): Int!
  updateComment(body: CommentBody!, id: ID!): [Int]!
  
  updateOrganization(id: ID, name: String, maxTeamsLimit: Int): [Int]!
  deleteOrganization(id: ID!): Int!

  createOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int, id: ID!): Organization!
  addUserInTeam(status: String!, id: ID!): [Int]!

  createTeam(organizationId: Int, name: String!, description: String, maxUsersLimit: Int): Team!
  createUserInTeam(userId: ID!, teamId: ID!, status: String!, roleId: ID!): UserInTeam!
  deleteTeam(id: ID!): Int!
  deleteUserInTeam(id: ID!): Int!
  updateTeam(id:ID!, name: String, description:String, maxUsersLimit: Int):[Int]!
  
  acceptRequst(id: ID!): [Int]!
  revokeRequst(id: ID!): [Int]!
  rejectRequst(id: ID!): [Int]!

  changeStatusRequest(id: ID!, status: String): [Int]

  createPointOperation(userId: ID!, delta: Int!, operationDescription: String!): PointOperations!

  createTask(teamId: ID, userId: ID, header: String, text: String, points: Int, status: String): Task!
  updateStatusTask(id: ID!, status: String): Task!
  addUserToTask(id: ID!, userId: ID): Task!
  deleteTask(id: ID!): Int!

  addUserInNewTeam(id: ID!, userId: ID!): UserInNewTeam!
}
`;

// FIXME: Исправить в схеме или удалить
// team(organizationId: Int): [Team]

// FIXME: Неизвестно, что оставлять
// updateOrganization(name: String!, ownerId: Int, organizationTypeId: Int, maxTeamsLimit: Int): [Int]!

// FIXME: удалить createUser / заменить на signUp
