import {  gql } from '@apollo/client';

export const GET_USERS = gql`
  query users {
    users {
      _id
      email
      password
      admin
    }
  }
`;

export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      password
      admin
    }
  }
`;