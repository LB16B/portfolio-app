import axios from "axios";
import cookies from "js-cookie";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: cookies.isKey('auth_token') ? `Bearer ${cookies.get('auth_token')}` : '',
  },
});


export default api;
