import { Home } from "./module/Home/Home.layout";
import { LandingPage } from "./module/Home/LandingPage";
import { Login } from "./module/Home/Login";
import PrivateRoute from "./module/ProtectedRoute";
import Dashboard from "./module/User/Dashboard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/app",
    element: (
      <PrivateRoute navigateTo="/login" condition={true}>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function MainApp() {
  return <RouterProvider router={router} />;
}

export default MainApp;
