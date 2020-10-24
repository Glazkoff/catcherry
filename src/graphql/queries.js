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

// (НИЖЕ) ЗАПРОСЫ К ТАБЛИЦЕ USERS
export const CREATE_USER_QUERY = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      surname
      name
      patricity
      birthday
      gender
      login
      password
      updatedAt
      createdAt
    }
  }
`;

export const ONE_USER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      surname
      name
      patricity
      birthday
      gender
      login
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      surname
      name
      patricity
      login
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation(
    $id: ID!
    $surname: String
    $name: String
    $patricity: String
    $gender: String
    $login: String
  ) {
    updateUser(
      id: $id
      surname: $surname
      name: $name
      patricity: $patricity
      gender: $gender
      login: $login
    )
  }
`;

export const DELETE_USER_QUERY = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;
