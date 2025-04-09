// server/server.js

const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const uploadRoute = require('./routes/upload');

const PORT = 3001;
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

const startApolloServer = async () => {
  // Wait for Apollo Server to start first
  await server.start();

  // Enable CORS before routes
  app.use(cors({
    origin: process.env.CLIENT_URL || "*"
  }));
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Mount the REST upload route
  app.use('/api', uploadRoute);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Now that server.start() has been awaited, apply the GraphQL middleware.
  app.use('/graphql', expressMiddleware(server));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Initialize Apollo Server and start Express after it has started.
startApolloServer();
