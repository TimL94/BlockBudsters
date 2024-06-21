const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db =require('./config/connection')

// sets the PORT and creates a new apollo server using predefined typeDefs and resolvers
const PORT = 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers
})


// sets app to express and than starts the server
const app = express();
const startApolloServer = async () => {
    await server.start();
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }
    
    app.use('/graphql', expressMiddleware(server));
  
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  };
  
 
startApolloServer();