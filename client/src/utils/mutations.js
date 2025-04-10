import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_MENU_ITEM = gql`
  mutation addMenuItem(
    $name: String!
    $category: String!
    $price: [PriceInput!]!
    $strain: String!
    $imageUrl: String!
  ) {
    addMenuItem(
      name: $name
      category: $category
      price: $price
      strain: $strain
      imageUrl: $imageUrl
    ) {
      _id
      name
      category
      price {
        quantity
        amount
      }
      strain
      imageUrl
    }
  }
`;

