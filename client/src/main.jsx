import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import Menu from './pages/Menu.jsx'

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
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
