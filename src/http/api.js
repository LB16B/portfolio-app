import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${Cookies.get('auth_token') || ''}`,
  },
});


export default api;
