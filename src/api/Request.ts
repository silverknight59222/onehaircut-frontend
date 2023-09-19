import axios from "axios";
import { getLocalStorage } from "./storage";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: "https://api-server.onehaircut.com/public/api/web/",
  // baseURL: 'http://localhost:8000/api/web/',
  withCredentials: false,
});

request.interceptors.request.use(
  function (config) {
    const token = getLocalStorage("auth-token");
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    console.error({ error });
    // if (response.status === 401) {
    //   window.location.replace(`/login`);
    //   return;
    // }
    if (response.status >= 400 || response.status === 401) {
      toast.error(error.message);
    }
    throw error.response.data.status;
  }
);

export { request };
