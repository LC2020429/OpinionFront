import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getCategories as getCategoriesRequest } from "../../services/api";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getCategories = useCallback(async () => {
    setIsFetching(true);
    const categoriesData = await getCategoriesRequest();

    if (categoriesData.error) {
      toast.error(categoriesData.error || "Error al obtener las categorías");
      setIsFetching(false);
      return;
    }

    setCategories(categoriesData.categories); 
    setIsFetching(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return {
    categories,
    isFetching,
  };
};
