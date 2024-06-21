const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    admin: Boolean
}

type Query {
users: [User]
}
`

module.exports = typeDefs;