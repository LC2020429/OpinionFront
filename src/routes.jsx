import { Navigate } from "react-router-dom";
import Login from "../src/components/auth/login";
import Register from "../src/components/auth/register";
import Dashboard from "../src/pages/dashboard.jsx";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />, // Redirige al login si entra a la raíz
  },
  {
    path: "/auth",
    children: [
      { path: "", element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
];
