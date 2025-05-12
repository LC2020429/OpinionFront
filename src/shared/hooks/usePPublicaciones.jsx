import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getPublicaciones as getPublicacionesRequest } from "../../services/api.jsx"; 
export const usePublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  
  const getPublicaciones = useCallback(async () => {
    setIsFetching(true);
    const publicacionesData = await getPublicacionesRequest();

    if (publicacionesData.error) {
      toast.error(
        publicacionesData.error || "Error al obtener las publicaciones"
      );
      setIsFetching(false);
      return;
    }

    setPublicaciones(publicacionesData.publicaciones);
    setIsFetching(false);
  }, []);

  useEffect(() => {
    getPublicaciones();
  }, [getPublicaciones]);

  return {
    publicaciones,
    isFetching,
  };
};
