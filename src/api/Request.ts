import axios from "axios";
import { getLocalStorage } from "./storage";
import { toast } from "react-toastify";

const request = axios.create({
  //baseURL: "https://api.onehaircut.com/api/web/",
  // baseURL: process.env.REACT_APP_API_URL + '/api/web/',
  baseURL: "http://127.0.0.1:8000/api/web/",
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
    if (response.status == 422) {
      throw error;
    }
    throw error.response.data.status;
  }
);

export { request };
