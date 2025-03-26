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

type Query {
    users: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser( email: String!, password: String!, admin: Boolean): Auth
}
`;

module.exports = typeDefs;