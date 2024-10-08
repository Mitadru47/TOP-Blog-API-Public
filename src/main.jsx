import './styles/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from './components/Index.jsx';

import PostDetail from './components/PostDetail.jsx';
import CommentDetail from './components/CommentDetail.jsx';

import UserDetail from './components/UserDetail.jsx';

const pollingFrequency = 5000;
console.log(`Polling Frequency: ${pollingFrequency / 1000}s`);

const router = createBrowserRouter([
  
  {

    path: "/",
    element: <Index poll={ pollingFrequency }/>

  },

  {

    path: "/index",
    element: <Index poll={ pollingFrequency }/>

  },

  {

    path: "/index/post/:id",
    element: <PostDetail poll={ pollingFrequency }/>

  },

  {

    path: "/index/user",
    element: <UserDetail poll={ pollingFrequency }/>
    
  },

  {

    path: "/index/post/:postid/comment/:commentid",
    element: <CommentDetail poll={ pollingFrequency }/>
    
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <div>
    <RouterProvider router={router} />
    
  </div>
);