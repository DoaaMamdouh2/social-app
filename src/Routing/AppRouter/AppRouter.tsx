import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Layout from "../../Components/Layout/Layout";
import Posts from "../../Pages/Posts/Posts";
import NotFound from "../../Pages/NotFound/NotFound";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../../Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "../../Components/AuthProtectedRoute/AuthProtectedRoute";
import PostDetials from "../../Pages/Posts/PostDetials/PostDetials";
import ChangePassword from "../../Pages/ChangePassword/ChangePassword";
import Profile from "../../Pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts",
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "postDetials/:id",
        element: (
          <ProtectedRoute>
            <PostDetials />
          </ProtectedRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <AuthProtectedRoute>
            <Register />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
