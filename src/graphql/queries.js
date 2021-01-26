import gql from "graphql-tag";

// (НИЖЕ) ЗАПРОСЫ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ
export const SIGN_UP = gql`
  mutation(
    $name: name_String_NotNull_pattern_azAZ!
    $surname: surname_String_pattern_azAZ
    $patricity: patricity_String_pattern_azAZ
    $birthday: String
    $login: String!
    $password: password_String_NotNull_minLength_6!
    $fingerprint: String!
  ) {
    signUp(
      input: {
        name: $name
        surname: $surname
        patricity: $patricity
        birthday: $birthday
        login: $login
        password: $password
        fingerprint: $fingerprint
      }
    ) {
      accessToken
      error {
        errorStatus
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation(
    $login: String!
    $password: password_String_NotNull_minLength_6!
    $fingerprint: String!
  ) {
    logIn(
      input: { login: $login, password: $password, fingerprint: $fingerprint }
    ) {
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
        surname
        patricity
        gender
        birthday
      }
    }
  }
`;

export const ACCEPT_REQUEST_QUERY = gql`
  mutation($id: ID!) {
    acceptRequst(id: $id)
  }
`;

export const CHANGE_STATUS_REQUEST_QUERY = gql`
  mutation($id: ID!, $status: String) {
    changeStatusRequest(id: $id, status: $status)
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
        surname
        patricity
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
    $name: name_String_NotNull_pattern_azAZ!
    $surname: surname_String_NotNull_pattern_azAZ!
    $patricity: patricity_String_NotNull_pattern_azAZ!
    $gender: String
    $login: String!
    $birthday: String
    $id: ID!
  ) {
    updateUser(
      input: {
        name: $name
        surname: $surname
        patricity: $patricity
        gender: $gender
        login: $login
        birthday: $birthday
      }
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
    }
  }
`;

export const USER_ORG_QUERY = gql`
  query($id: ID!) {
    userOrganization(id: $id) {
      id
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

export const TEAM_QUERY = gql`
  query($id: ID!) {
    oneTeam(id: $id) {
      id
      name
      description
      maxUsersLimit
      updatedAt
    }
  }
`;

export const TEAM_NAME_QUERY = gql`
  query($id: ID!) {
    oneTeam(id: $id) {
      name
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

export const ADD_USER_IN_TEAM_QUERY = gql`
  mutation($id: ID!, $userId: ID!) {
    addUserInNewTeam(id: $id, userId: $userId) {
      id
    }
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
        patricity
      }
    }
  }
`;

export const ROLE_QUERY = gql`
  query($id: ID!) {
    role(id: $id) {
      id
      name
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

// Получение одного поста
export const POST_QUERY = gql`
  query($id: ID!, $userId: ID!) {
    post(id: $id, userId: $userId) {
      id
      body {
        header
        text
      }
      likesOfPost {
        userId
      }
      createdAt
    }
  }
`;

// Получение всех постов для пользователя
export const POSTS_QUERY = gql`
  query($userId: ID!) {
    posts(userId: $userId) {
      id
      body {
        header
        text
      }
      likesOfPost {
        userId
      }
      createdAt
    }
  }
`;

// Создание поста
export const CREATE_POST = gql`
  mutation($body: PostBody!, $authorId: Int!, $userId: [Int]!) {
    createPost(body: $body, authorId: $authorId, userId: $userId) {
      id
      createdAt
    }
  }
`;

// Удаление поста
export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ LikesOfPosts

// Получаем информацию о всех лайках постов пользователя
export const LIKES_OF_POST_FROM_USER = gql`
  query($userId: ID!) {
    likesOfPostFromUser(userId: $userId) {
      postId
    }
  }
`;

// Лайкнуть данный пост данным пользователем
export const CREATE_LIKE_OF_POST = gql`
  mutation($userId: ID!, $postId: ID!) {
    addLikeOfPost(userId: $userId, postId: $postId) {
      userId
      postId
    }
  }
`;

// Удалить лайк с данного поста данным пользователем
export const DELETE_LIKE_OF_POST = gql`
  mutation($userId: ID!, $postId: ID!) {
    deleteLikeOfPost(userId: $userId, postId: $postId)
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ LikesOfComments

// Получаем информацию о всех лайках комментариев пользователя
export const LIKES_OF_COMMENT_FROM_USER = gql`
  query($userId: ID!) {
    likesOfCommentFromUser(userId: $userId) {
      commentId
    }
  }
`;

// Лайкнуть данный комментарий данным пользователем
export const CREATE_LIKE_OF_COMMENT = gql`
  mutation($userId: ID!, $commentId: ID!) {
    addLikeOfComment(userId: $userId, commentId: $commentId) {
      userId
      commentId
    }
  }
`;
// Удалить лайк с данного комментария данным пользователем
export const DELETE_LIKE_OF_COMMENT = gql`
  mutation($userId: ID!, $commentId: ID!) {
    deleteLikeOfComment(userId: $userId, commentId: $commentId)
  }
`;

// -- //

export const REVOKE_REQUEST_QUERY = gql`
  mutation($id: ID!) {
    revokeRequst(id: $id)
  }
`;

// Получение баллов и информации о них для пользователя
export const GET_POINTS_USER_QUERY = gql`
  query($userId: ID!, $limit: Int) {
    getPointsUser(userId: $userId, limit: $limit) {
      id
      userId
      pointQuantity
      userPointsOperation {
        id
        delta
        operationDescription
        createdAt
      }
    }
  }
`;

// Создание операции с баллами
export const CREATE_POINTS_OPERATION = gql`
  mutation($userId: ID!, $delta: Int!, $operationDescription: String!) {
    createPointOperation(
      userId: $userId
      delta: $delta
      operationDescription: $operationDescription
    ) {
      delta
      pointAccountId
      operationDescription
    }
  }
`;

export const GET_POINTS_LAST_WEEK_QUERY = gql`
  query($id: ID!) {
    pointsLastWeek(id: $id)
  }
`;

export const RAITING_IN_TEAMS_QUERY = gql`
  query($teamId: ID!) {
    raitingInTeams(teamId: $teamId) {
      user {
        id
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

export const PERSONAL_USER_STATISTIC_QUERY = gql`
  query($userId: Int!) {
    personalUserStatistics(userId: $userId) {
      id
      pointQuantity
      pointsOperation {
        delta
        operationDescription
        createdAt
      }
    }
  }
`;
// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ TASKS
export const ALL_TASKS_IN_TEAM_QUERY = gql`
  query($teamId: ID!) {
    allTasksInOneTeam(teamId: $teamId) {
      id
      userId
      teamId
      status
      body {
        header
        text
        points
      }
      status
      tasksUser {
        name
        surname
        id
        userPoints {
          id
        }
      }
    }
  }
`;

export const ALL_USER_TASK_QUERY = gql`
  query($id: ID!) {
    allUserTasks(id: $id) {
      id
      teamId
      status
      body {
        header
        text
        points
      }
      tasksTeam {
        name
      }
      tasksUser {
        id
      }
    }
  }
`;

export const DELETE_TASK_QUERY = gql`
  mutation($id: ID!) {
    deleteTask(id: $id)
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
export const CHANGE_STATUS_TASK_QUERY = gql`
  mutation($id: ID!, $status: String) {
    updateStatusTask(id: $id, status: $status) {
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

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ NOTIFICATIONS

// Получение всех оповещений
export const NOTIFICATIONS_QUERY = gql`
  query {
    notifications {
      id
      body {
        header
        text
      }
      authorId
      userId
      ReadOrNot {
        userId
        notificationId
        readOrNot
      }
      endTime
      createdAt
    }
  }
`;

// Получение всех непрочитанных оповещений для одного пользователя
export const NOTIFICATIONS_FOR_USER_QUERY = gql`
  query($userId: ID!) {
    notificationsForUser(userId: $userId) {
      id
      body {
        header
        text
      }
      authorId
      userId
      notificationAuthor {
        name
        surname
        patricity
      }
      ReadOrNot {
        userId
        notificationId
        readOrNot
      }
      endTime
      createdAt
    }
  }
`;

// Создание оповещений
export const CREATE_NOTIFICATION = gql`
  mutation(
    $body: NotificationBody!
    $typeId: Int!
    $authorId: Int!
    $userId: [Int]
    $endTime: String!
  ) {
    createNotification(
      body: $body
      typeId: $typeId
      authorId: $authorId
      userId: $userId
      endTime: $endTime
    ) {
      id
    }
  }
`;

// Поменять статус оповещения на "Прочитано"
export const UPDATE_NOTIFICATION = gql`
  mutation($notificationId: ID!, $userId: ID!, $checkNotification: Boolean) {
    updateNotification(
      notificationId: $notificationId
      userId: $userId
      checkNotification: $checkNotification
    )
  }
`;

//Удалить оповещение
export const DELETE_NOTIFICATION = gql`
  mutation($id: ID!) {
    deleteNotification(id: $id)
  }
`;

// НЕКЛАССИФИЦИРОВАННЫЕ ЗАПРОСЫ
export const LOG_OUT = gql`
  mutation($fingerprint: String!) {
    logOut(fingerprint: $fingerprint)
  }
`;

export const IS_LOGIN_USED = gql`
  query($login: String!) {
    isLoginUsed(login: $login)
  }
`;
