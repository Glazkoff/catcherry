import gql from "graphql-tag";

export const usersQuery = gql`
  query {
    users {
      id
      name
    }
  }
`;
