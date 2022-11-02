import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './component/Navbar/Navbar';
import Form from './component/Form/Form';
import Home from './component/Home/Home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import DetailFoods from './component/DetailFoods/DetailFoods';
import { AddFoods } from './component/AddFoods/AddFoods';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </>
    ),
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
      {
        path: "/DetailFoods/:id",
        element: <DetailFoods />,
      },
      {
        path: "/AddFoods",
        element: <AddFoods />,
      },
    ]
    ,
    
  },
  {
    path: "/Form",
    element: <Form />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();