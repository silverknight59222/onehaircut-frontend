import axios from 'axios';
import { getLocalStorage} from './storage';

const request = axios.create({
  baseURL: 'https://api-server.onehaircut.com/public/api/web/',
  // baseURL: 'http://localhost:8000/api/web/',
  withCredentials: false,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    let alertPresent = false;

    console.error({ error });

    throw error.response.data.status;
  }
);

const token = getLocalStorage('AuthToken');

if (token) {
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { request };
