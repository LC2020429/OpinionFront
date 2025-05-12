import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3002/gestorOpinions/v1",
  timeout: 3000,
  httpsAgent: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        const token = parsedUser?.userDetails?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn("Token no encontrado en userDetails");
        }
      } catch (e) {
        console.error("Error al parsear user del localStorage:", e);
      }
    }

    return config;
  },
  (e) => Promise.reject(e)
);

export const register = async (data) => {
  try {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const login = async (data) => {
  try {
    const response = await apiClient.post("/auth/login", data);
    if (response.data && response.data.userDetails) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/categoria/");
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getPublicaciones = async () => {
  try {
    const response = await apiClient.get(
      "/publicacion/listPublicacionesPublicas"
    );
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getComments = async (pid) => {
  try {
    const response = await apiClient.get(
      `/comentarios/getComentsByPublicacion/${pid}`
    );
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const addComment = async (data) => {
  try {
    const response = await apiClient.post(`/comentarios/addComent`, data);
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
