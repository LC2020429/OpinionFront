import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getComments as getCommentsRequest } from "../../services/api";

export const useComments = (pid) => {
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const getComments = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    const commentsData = await getCommentsRequest(pid);
    if (commentsData.error) {
      toast.error(commentsData.error || "Error al obtener los comentarios");
      setError(commentsData.error);
      setIsFetching(false);
      return;
    }

    setComments(commentsData.comentarios || []);
    setIsFetching(false);
  }, [pid]);

  useEffect(() => {
    if (pid) {
      getComments();
    }
  }, [getComments, pid]);

  return {
    comments,
    isFetching,
    error,
  };
};
