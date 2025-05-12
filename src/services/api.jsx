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
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
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
}

export const getPublicaciones = async () => {
  try {
    const response = await apiClient.get("/publicacion/listPublicacionesPublicas");
    return response.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
}  