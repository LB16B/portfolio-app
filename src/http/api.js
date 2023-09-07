import axios from "axios";
import cookies from "js-cookie";
// CookieのXSRF-TOKENも値をLaravelに自動で送信
axios.defaults.withCredentials = true;


const authToken = cookies.get('auth_token');


const headers = {
  Accept: 'application/json',
  Authorization: authToken ? `Bearer ${authToken}` : '',
};


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers,
});


export default api;
