const typeDefs = `
type User {
    _id: ID
    email: String
    password: String
    admin: Boolean
}

type Auth {
    token: ID!
    user: User
}

type MenuItem {
    _id: ID
    name: String
    category: String
    price: [Price!]!
    strain: String
    imageUrl: String
}

type Price {
  quantity: String!
  amount: Float!
}

input PriceInput {
  quantity: String!
  amount: Float!
}

type Query {
    users: [User]
    menuItems: [MenuItem]
}

type Mutation {
    login(
        email: String!, 
        password: String!
    ): Auth

    addUser( 
        email: String!, 
        password: String!, 
        admin: Boolean
    ): Auth

    addMenuItem( 
        name: String!, 
        category: String!, 
        price: [PriceInput!]!, 
        strain: String!,
        imageUrl: String!
    ): MenuItem
}
`;

module.exports = typeDefs;
