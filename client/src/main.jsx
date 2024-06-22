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
        path: '/Events',
        element: <Events />
      },
      {
        path: '/Menu',
        element: <Menu />
      },
      {
        path: '/Order',
        element: <Order />
      },
      {
        path: '/Booking',
        element: <Booking />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Login',
        element: <Login />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
