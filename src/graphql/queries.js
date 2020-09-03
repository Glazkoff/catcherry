import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`;

export const CREATE_USER_QUERY = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const DELETE_USER_QUERY = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;
