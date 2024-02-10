

import './App.css'

import {Sidebar} from "./components/Sidebar.jsx";
import profile from "./assets/profile.jpeg"
import {Home} from "./pages/Home.jsx";
import Loginsignup, {Login} from "./pages/Login.jsx";
import { Mainlayout } from './pagelayout/mainlayout';
import { Feed } from './pagelayout/Feed'
import { Chat} from './pagelayout/Chat';
import { Createpost } from './components/feed/Createpost';
import {PostOpen} from "./components/feed/PostOpen.jsx";
import NotFoundPage from './pages/NotFoundPage';

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
    element: <Feed refresh/>,
  },
  {
    path: '/createpost',
    element: <Createpost/>,

  },
  {
    path: '/chat',
    element: <Chat/>,

  },
  {
    path: '/postopen',
    element: <PostOpen/>,

  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

  return (
    
    <div >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
