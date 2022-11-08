import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("ACCESS_TOKEN");
  const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

  config.headers.Authorization = token;
  config.headers.RefreshToken = refreshToken;

  return config;
});