import { useState } from "react";
import toast from "react-hot-toast";
import {
  register as registerRequest,
  login as loginRequest,
} from "../../services/api.jsx";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (
    name,
    email,
    password,
    profileDescription,
    phone,
    cuentaName,
    profilePicture 
  ) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileDescription", profileDescription);
      formData.append("phone", phone);
      formData.append("cuentaName", cuentaName);
      formData.append("role", "USER");
      formData.append("estado", "PUBLICO");

      if (profilePicture) {
        formData.append("profilePicture", profilePicture); 
      }

      const registerResponse = await registerRequest(formData);

      if (registerResponse.error) {
        const errorMessage =
          registerResponse.e?.response?.data?.message || "Error al registrarse";
        toast.error(errorMessage);
      } else {
        const loginResponse = await loginRequest({ email, password });

        if (loginResponse.error) {
          const errorMessage =
            loginResponse.e?.response?.data?.message ||
            "Error al iniciar sesión";
          toast.error(errorMessage);
        } else {
          const { token } = loginResponse.data.userDetails;
          localStorage.setItem("token", token);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Error del servidor al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
  };
};
