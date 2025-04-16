const { User, MenuItem } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    menuItems: async () => {
      return await MenuItem.find({});
    },
    menuByCategory: async (_, { category }) => {
      return await MenuItem.find({ category });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password, admin }) => {
      const user = await User.create({ email: email.toLowerCase(), password, admin });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addMenuItem: async (parent, { name, category, price, strain, imageUrl, effect }) => {
      // Create a new MenuItem with the provided imageUrl and other data.
      const menuItem = await MenuItem.create({ name, category, price, strain, imageUrl, effect });
      return menuItem;
    }
  }
};

module.exports = resolvers;
