import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements ,Route, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './components/index.js'
import AddPost from "./Pages/AddPost";
import SignUp from './Pages/SignUp.jsx'
import EditPost from "./Pages/EditPost";
import Login from './Pages/Login.jsx'
import Post from "./Pages/Post";

import AllPosts from "./Pages/AllPosts";
import Home from './Pages/Home.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path = "/" element={<AuthLayout authentication={false} >{<Home/>}</AuthLayout>} /> 
      <Route path = "/login" element={<AuthLayout authentication={false} >{<Login/>}</AuthLayout>} /> 
      <Route path = "/signup" element={<AuthLayout authentication={false} >{<SignUp/>}</AuthLayout>} /> 
      <Route path = "/all-posts" element={<AuthLayout authentication >{<AllPosts/>}</AuthLayout>} /> 
      <Route path = "/add-post" element={<AuthLayout authentication >{<AddPost/>}</AuthLayout>} /> 
      <Route path = "/edit-post/:slug" element={<AuthLayout authentication >{<EditPost/>}</AuthLayout>} /> 
      <Route path = "/post/:slug" element={<AuthLayout authentication >{<Post/>}</AuthLayout>} /> 
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
