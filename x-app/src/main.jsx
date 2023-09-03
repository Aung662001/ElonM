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
import Following from "./pages/Following";
import NewComment from "./pages/NewComment";
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
      {
        path: "/following/:handle",
        element: <Following />,
      },
      {
        path: "/follower/:handle",
        element: <Following />,
      },
      {
        path: "/comment/new",
        element: <NewComment />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
