import gql from "graphql-tag";

// (НИЖЕ) ЗАПРОСЫ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ
export const SIGN_UP = gql`
  mutation(
    $name: String!
    $login: String!
    $password: String!
    $fingerprint: String!
  ) {
    signUp(
      name: $name
      login: $login
      password: $password
      fingerprint: $fingerprint
    ) {
      accessToken
      error {
        errorStatus
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation($login: String!, $password: String!, $fingerprint: String!) {
    logIn(login: $login, password: $password, fingerprint: $fingerprint) {
      accessToken
      error {
        errorStatus
        message
      }
    }
  }
`;

export const UPDATE_TOKENS = gql`
  mutation($fingerprint: String!) {
    updateTokens(fingerprint: $fingerprint) {
      accessToken
      error {
        errorStatus
        message
      }
    }
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ USERSINTEAMS
export const CREATE_TEAM = gql`
  mutation(
    $organizationId: Int
    $name: String!
    $description: String
    $maxUsersLimit: Int
  ) {
    createTeam(
      organizationId: $organizationId
      name: $name
      description: $description
      maxUsersLimit: $maxUsersLimit
    ) {
      id
    }
  }
`;

export const DELETE_IN_TEAMS_QUERY = gql`
  mutation($id: ID!) {
    deleteUserInTeam(id: $id)
  }
`;

export const REQUESTS_QUERY = gql`
  query($teamId: ID!) {
    requests(teamId: $teamId) {
      id
      userId
      teamId
      status
      roleId
      user {
        id
        name
      }
    }
  }
`;

export const ACCEPT_REQUEST_QUERY = gql`
  mutation($id: ID!) {
    acceptRequst(id: $id)
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ USERS
export const CREATE_USER_QUERY = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const ONE_USER_QUERY = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      surname
      name
      surname
      patricity
      gender
      birthday
      login
      createdAt
    }
  }
`;

export const ONE_USER_IN_TEAMS_QUERY = gql`
  query($userId: ID!) {
    oneUserInTeams(userId: $userId) {
      id
      userId
      teamId
      status
      roleId
      role {
        name
      }
      user {
        id
        name
      }
      team {
        id
        name
        organization {
          id
          name
        }
      }
    }
  }
`;

export const TEAMS_IN_ONE_ORG_QUERY = gql`
  query($organizationId: ID!) {
    teamsInOneOrganization(organizationId: $organizationId) {
      id
      name
      description
      maxUsersLimit
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
      surname
      patricity
      gender
      birthday
      login
      createdAt
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation(
    $name: String!
    $surname: String
    $patricity: String
    $gender: String
    $login: String
    $id: ID!
  ) {
    updateUser(
      name: $name
      surname: $surname
      patricity: $patricity
      gender: $gender
      login: $login
      id: $id
    )
  }
`;

export const DELETE_USER_QUERY = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ ORGANIZATIONS

export const CREATE_ORGANIZATION = gql`
  mutation(
    $name: String!
    $ownerId: Int
    $organizationTypeId: Int
    $maxTeamsLimit: Int
  ) {
    createOrganization(
      name: $name
      ownerId: $ownerId
      organizationTypeId: $organizationTypeId
      maxTeamsLimit: $maxTeamsLimit
    ) {
      id
    }
  }
`;

export const ORGS_QUERY = gql`
  query {
    organizations {
      id
      name
      ownerId
      organizationTypeId
      maxTeamsLimit
      owner {
        name
      }
      organizationType {
        name
      }
    }
  }
`;

export const ORG_TYPES_QUERY = gql`
  query {
    organizationTypes {
      id
      name
    }
  }
`;

export const ONE_ORG_QUERY = gql`
  query($id: ID!) {
    organization(id: $id) {
      id
      name
      ownerId
      organizationTypeId
      maxTeamsLimit
      createdAt
      organizationType {
        name
      }
      owner {
        surname
        name
        patricity
      }
    }
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ TEAMS
export const TEAMS_QUERY = gql`
  query {
    teams {
      id
      organizationId
      name
      description
      maxUsersLimit
      updatedAt
    }
  }
`;

export const TEAM_IN_ORG_QUERY = gql`
  query($organizationId: Int) {
    team(organizationId: $organizationId) {
      id
      organizationId
      name
      description
      maxUsersLimit
      updatedAt
    }
  }
`;

export const UPDATE_TEAMS_QUERY = gql`
  mutation(
    $name: String!
    $description: String
    $maxUsersLimit: Int
    $id: ID!
  ) {
    updateTeam(
      name: $name
      description: $description
      maxUsersLimit: $maxUsersLimit
      id: $id
    )
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ USERSINTEAMS
export const USERS_IN_TEAMS_QUERY = gql`
  query($teamId: ID!) {
    usersInTeams(teamId: $teamId) {
      id
      userId
      teamId
      status
      roleId
      user {
        id
        name
        surname
      }
    }
  }
`;

export const CREATE_USER_IN_TEAM = gql`
  mutation($userId: ID!, $teamId: ID!, $status: String!, $roleId: ID!) {
    createUserInTeam(
      userId: $userId
      teamId: $teamId
      status: $status
      roleId: $roleId
    ) {
      id
    }
  }
`;

export const DELETE_ORG_QUERY = gql`
  mutation($id: ID!) {
    deleteOrganization(id: $id)
  }
`;

export const UPDATE_ORG_QUERY = gql`
  mutation($name: String, $maxTeamsLimit: Int, $id: ID!) {
    updateOrganization(name: $name, maxTeamsLimit: $maxTeamsLimit, id: $id)
  }
`;

export const DELETE_TEAM_QUERY = gql`
  mutation($id: ID!) {
    deleteTeam(id: $id)
  }
`;

export const UPDATE_TEAM_QUERY = gql`
  mutation($name: String, $description: String, $maxUsersLimit: Int, $id: ID!) {
    updateTeam(
      name: $name
      description: $description
      maxUsersLimit: $maxUsersLimit
      id: $id
    )
  }
`;

export const ADD_IN_TEAM_QUERY = gql`
  mutation($status: String!, $id: ID!) {
    addUserInTeam(status: $status, id: $id)
  }
`;

export const REJECT_REQUEST = gql`
  mutation($id: ID!) {
    rejectRequst(id: $id)
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ POSTS

export const ONE_POST_QUERY = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      body {
        header
        text
      }
      createdAt
    }
  }
`;

export const REVOKE_REQUEST_QUERY = gql`
  mutation($id: ID!) {
    revokeRequst(id: $id)
  }
`;

export const GET_POINTS_QUERY = gql`
  query($userId: ID!) {
    getPointsUser(userId: $userId) {
      id
      userId
      pointQuantity
    }
  }
`;

export const POSTS_QUERY = gql`
  query {
    posts {
      id
      body {
        header
        text
      }
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation($body: PostBody!, $authorId: Int!, $organizationId: Int!) {
    createPost(
      body: $body
      authorId: $authorId
      organizationId: $organizationId
    ) {
      id
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

export const CARGE_POINTS_QUERY = gql`
  mutation(
    $pointAccountId: Int!
    $delta: Int!
    $operationDescription: String!
  ) {
    createPointOperation(
      pointAccountId: $pointAccountId
      delta: $delta
      operationDescription: $operationDescription
    ) {
      id
    }
  }
`;

export const RAITING_IN_TEAMS_QUERY = gql`
  query($teamId: ID!) {
    raitingInTeams(teamId: $teamId) {
      id
      user {
        name
        userPoints {
          pointQuantity
          pointsOperation {
            delta
            createdAt
          }
        }
      }
    }
  }
`;
// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ TASKS
export const TASKS_QUERY = gql`
  query($teamId: ID!) {
    tasks(teamId: $teamId) {
      id
      userId
      teamId
      body {
        header
        text
        points
      }
      status
      tasksUser {
        name
        surname
        userPoints {
          id
        }
      }
    }
  }
`;
export const ADD_TASK_QUERY = gql`
  mutation(
    $teamId: ID
    $userId: ID
    $header: String
    $text: String
    $points: Int
    $status: String
  ) {
    createTask(
      teamId: $teamId
      userId: $userId
      header: $header
      text: $text
      points: $points
      status: $status
    ) {
      id
      userId
      teamId
      body {
        header
        text
        points
      }
      status
      tasksUser {
        name
        surname
        userPoints {
          id
        }
      }
    }
  }
`;
export const EDIT_TASK_QUERY = gql`
  mutation($id: ID!, $status: String) {
    updateTask(id: $id, status: $status) {
      status
    }
  }
`;

export const ADD_USER_TO_TASK_QUERY = gql`
  mutation($id: ID!, $userId: ID) {
    addUserToTask(id: $id, userId: $userId) {
      userId
    }
  }
`;

export const BACKLOG_QUERY = gql`
  query($teamId: ID!) {
    backlog(teamId: $teamId) {
      id
      userId
      teamId
      body {
        header
        text
        points
      }
      status
      tasksUser {
        name
        surname
        userPoints {
          id
        }
      }
    }
  }
`;

export const NOTIFICATIONS_USER_QUERY = gql`
  query {
    notifications {
      id
      body {
        header
        text
        buttonLink
      }
      authorId
      teamId
      forAllUsers
      createdAt
    }
  }
`;

export const ADD_NOTIFICATION_QUERY = gql`
  mutation(
    $body: NotificationBody!
    $authorId: Int!
    $teamId: Int!
    $forAllUsers: Int
  ) {
    createNotification(
      body: $body
      authorId: $authorId
      teamId: $teamId
      forAllUsers: $forAllUsers
    ) {
      id
    }
  }
`;
export const STATISTICS_NEW_QUERY = gql`
  query statisticsNew {
    statisticsNewUsers
    statisticsNewOrgs
  }
`;

export const STATISTICS_DELETE_QUERY = gql`
  query {
    statisticsDeleteUsers
    statisticsDeleteOrgs
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ COMMENTS
export const CREATE_COMMENT_QUERY = gql`
  mutation($body: String!, $authorId: Int!, $postId: Int!) {
    createComment(body: $body, authorId: $authorId, postId: $postId) {
      id
      body
      authorId
      postId
    }
  }
`;

export const COMMENTS_QUERY = gql`
  query {
    comments {
      id
      body
      authorId
      author {
        name
      }
      postId
    }
  }
`;

export const UPDATE_COMMENT_QUERY = gql`
  mutation($body: String!, $id: ID!) {
    updateComment(body: $body, id: $id)
  }
`;

export const DELETE_COMMENT_QUERY = gql`
  mutation($id: ID!) {
    deleteComment(id: $id)
  }
`;
export const LOG_OUT = gql`
  mutation($fingerprint: String!) {
    logOut(fingerprint: $fingerprint)
  }
`;
