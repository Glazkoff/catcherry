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
      name
      patricity
      gender
      birthday
      login
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

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ TEAMS
export const TEAMS_QUERY = gql`
  query {
    teams {
      id
      organizationId
      name
      description
      maxUsersLimit
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
    }
  }
`;

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ USERSINTEAMS
export const USERS_IN_TEAMS_QUERY = gql`
  query($teamId: ID!) {
    usersInTeams(teamId: $teamId) {
      id
      userId
      status
      roleId
      user {
        id
        name
        surname
        patricity
        gender
        birthday
        login
      }
    }
  }
`;

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

export const REVOKE_REQUEST_QUERY = gql`
  mutation($id: ID!) {
    revokeRequst(id: $id)
  }
`;

export const GET_POINTS_QUERY = gql`
  query($userId: Int!) {
    getPointsUser(userId: $userId) {
      id
      userId
      pointQuantity
    }
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
      tasksTeam {
        name
        team {
          roleId
        }
      }
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
    $userId: ID
    $header: String
    $text: String
    $points: Int
    $status: String
  ) {
    createTask(
      userId: $userId
      header: $header
      text: $text
      points: $points
      status: $status
    ) {
      id
      userId
      body {
        header
        text
      }
      status
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
