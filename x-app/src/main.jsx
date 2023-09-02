import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import Likes from "./pages/Likes";
import Comments from "./pages/Comments";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ThemedApp />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile/:handle",
        element: <Profile />,
      },
      {
        path: "/comment/:id",
        element: <Comment />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
      {
        path: "/posts/:id/comments",
        element: <Comments />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
