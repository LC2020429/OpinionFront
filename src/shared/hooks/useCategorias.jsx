import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCategories as fetchCategoriasRequest } from "../../services/api.jsx"; 
export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategorias = async () => {
      setIsLoading(true);
      const response = await fetchCategoriasRequest();
      setIsLoading(false);

      if (response.error) {
        const errorMessage =
          response?.e?.response?.data?.message ||
          "Error al obtener las categorías";
        toast.error(errorMessage); 
        setError(errorMessage);
      } else {
        setCategorias(response.data); 
      }
    };

    getCategorias();
  }, []); 
  return {
    categorias,
    isLoading,
    error,
  };
};
