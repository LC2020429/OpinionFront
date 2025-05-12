import { useState } from "react";
import { addComment as addCommentRequest } from "../../services/api.jsx";

export const useAddComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addComment = async (commentData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await addCommentRequest(commentData);
      setIsLoading(false);

      if (response.error) {
        setError("Error al agregar el comentario");
        return null;
      }

      return response; 
    } catch (e) {
      setIsLoading(false);
      setError("Error al agregar el comentario");
    }
  };

  return {
    addComment,
    isLoading,
    error,
  };
};
