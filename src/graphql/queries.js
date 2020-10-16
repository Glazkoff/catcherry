import gql from "graphql-tag";

// (НИЖЕ) ЗАПРОСЫ АВТОРИЗАЦИИ И РЕГИСТРАЦИИ

export const SIGN_UP = gql`
  mutation($name: String!, $login: String!, $password: String!) {
    signUp(name: $name, login: $login, password: $password) {
      accessToken
      error {
        errorStatus
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation($login: String!, $password: String!) {
    logIn(login: $login, password: $password) {
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
  query {
    user(id:156) {
      id
      name
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

export const UPDATE_USER_QUERY = gql`
  mutation($name: String!, $id: ID!) {
    updateUser(name: $name, id: $id)
  }
`;

export const DELETE_USER_QUERY = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;
