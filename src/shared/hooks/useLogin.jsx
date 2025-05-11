import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginRequest } from "../../services/api.jsx";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    const response = await loginRequest({
      email,
      password,
    });
    setIsLoading(false);

    if (response.error) {
      const errorMessage =
        response.e?.response?.data?.message || "Error al iniciar sesión";
      toast.error(errorMessage);
    } else {
      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/dashboard");
    }
  };

  return {
    login,
    isLoading,
  };
};
