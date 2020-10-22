import gql from "graphql-tag";

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
      password
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
    $surname: String!
    $name: String!
    $patricity: String
    $gender: String!
    $login: String!
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
