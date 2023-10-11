

import './App.css'

import {Sidebar} from "./components/Sidebar.jsx";
import profile from "./assets/profile.jpeg"
import {Home} from "./pages/Home.jsx";
import Loginsignup, {Login} from "./pages/Login.jsx";
import { Mainlayout } from './pagelayout/mainlayout';
import { Feed } from './pagelayout/Feed'
import { Createpost } from './components/feed/Createpost';

import {RouterProvider,createBrowserRouter} from "react-router-dom";
function App() {
let router = createBrowserRouter([

  {
    path: '/login',
    element: <Loginsignup />,
  },
  {
    path: '/',
    element: <Mainlayout />,
  },
  {
    path: '/feed',
    element: <Feed/>,
  },
  {
    path: '/createpost',
    element: <Createpost/>,

  },

  {
    path: '*',
    element: <><h1>Not found</h1></>,
  },
])

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
