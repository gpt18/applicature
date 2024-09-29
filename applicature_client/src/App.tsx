import Dashboard from "./module/User/Dashboard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
