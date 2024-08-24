import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from './components/Header.jsx';
import Index from './components/Index.jsx';

import PostDetail from './components/PostDetail.jsx';
import CommentDetail from './components/CommentDetail.jsx';

import UserDetail from './components/UserDetail.jsx';

const router = createBrowserRouter([
  
  {

    path: "/",
    element: <Index />

  },

  {

    path: "/index",
    element: <Index />

  },

  {

    path: "/index/post/:id",
    element: <PostDetail />

  },

  {

    path: "/index/user",
    element: <UserDetail />
    
  },

  {

    path: "/index/post/:postid/comment/:commentid",
    element: <CommentDetail />
    
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>

    <Header />
    <RouterProvider router={router} />
    
  </React.StrictMode>,
);