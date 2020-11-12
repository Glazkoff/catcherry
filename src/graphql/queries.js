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
export const USERS_IN_TEAMS_QUERY = gql`
  query {
    usersInTeams {
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

export const DELETE_IN_TEAMS_QUERY = gql`
  mutation($id: ID!) {
    deleteUserInTeam(id: $id)
  }
`;

export const REQUESTS_QUERY = gql`
  query {
    requests {
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
      patricity
      gender
      birthday
      login
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

export const DELETE_ORG_QUERY = gql`
  mutation($id: ID!) {
    deleteOrganization(id: $id)
  }
`;

export const UPDATE_ORG_QUERY = gql`
  mutation($name: String!, $maxTeamsLimit: Int, $id: ID!) {
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
