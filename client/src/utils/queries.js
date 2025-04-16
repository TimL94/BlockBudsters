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

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    menuItems {
      _id
      name
      category
      strain
      price {
        quantity
        amount
      }
      imageUrl
      effect
    }
  }
`;

export const GET_MENU_BY_CATEGORY = gql`
  query GetMenuByCategory($category: String!) {
    menuByCategory(category: $category) {
      _id
      name
      strain
      imageUrl
      effect
      price {
        quantity
        amount
      }
    }
  }
`;
