import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import Menu from './pages/Menu.jsx'
import Order from './pages/Order.jsx'
import Booking from './pages/Booking.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import NewUser from './pages/NewUser.jsx'
import Inventory from './pages/Inventory.jsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: '',
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/Menu',
        element: <Menu />
      },
      {
        path: '/Order',
        element: Auth.loggedIn() ? <Order /> : <Login />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Login',
        element: Auth.loggedIn() ? <Home /> : <Login />
      },
      {
        path: '/NewUser',
        element: Auth.loggedIn() ? <Home /> : <NewUser />
      },
      {
        path: '/Inventory',
        element: /*Auth.loggedIn() && Auth.getProfile().data.admin ?*/ <Inventory />/* : <Login />*/
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
