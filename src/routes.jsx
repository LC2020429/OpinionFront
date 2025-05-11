import { Navigate } from "react-router-dom";
import Login from "../src/components/auth/login";
import Register from "../src/components/auth/register";
import Dashboard from "../src/pages/dashboard.jsx";
import Categorias from "../src/pages/home/categoriaPage.jsx";

const PrivateRoute = ({ element }) => {
  const userDetails = localStorage.getItem("user");

  if (!userDetails) {
    return <Navigate to="/auth/login" replace />;
  }
  return element;
};

export const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
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
    element: <PrivateRoute element={<Dashboard />} />,
  },
  {
    path: "/categoria", // Ruta independiente para Categorias
    element: <PrivateRoute element={<Categorias />} />, 
  },
  {
    path: "*", 
    element: <Navigate to="/auth/login" replace />,
  },
];
