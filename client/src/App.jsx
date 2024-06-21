

import './App.css'

import {Sidebar} from "./components/Sidebar.jsx";
import profile from "./assets/profile.jpeg"
import {Home} from "./pages/Home.jsx";
import Loginsignup, {Login} from "./pages/Login.jsx";
import {Logouthere} from "./components/profile/Logoutpop.jsx";
import { Mainlayout } from './pagelayout/Mainlayout';
import { Feed } from './pagelayout/Feed'
import { Chat} from './pagelayout/Chat';
import { Createpost } from './components/feed/Createpost';
import {PostOpen} from "./components/feed/PostOpen.jsx";
import NotFoundPage from './pages/NotFoundPage';
import { Filteredpost } from './components/profile/mypost.jsx';

import {RouterProvider,createBrowserRouter} from "react-router-dom";
import { Forums } from './pages/Forums.jsx';
function App() {
let router = createBrowserRouter([

  {
    path: '/login',
    element: <Loginsignup />,
  },
  {
    path : '/userpost',
    element: <Filteredpost />,
  },
  {
    path: '/',
    element: <Mainlayout />,
  },
  {
    path: '/forums',
    element: <Forums />,

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
    path: '/logout',
    element: <Logouthere />,

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
