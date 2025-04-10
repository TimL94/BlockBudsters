const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;
const expiration = '1h';

module.exports = {
  AuthenticationError: function (message = 'Could not authenticate user.') {
    return new GraphQLError(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  },

  signToken: function ({ email, _id, admin }) {
    const payload = { email,  _id, admin};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

};