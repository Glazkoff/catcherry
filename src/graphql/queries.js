import gql from "graphql-tag";

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
