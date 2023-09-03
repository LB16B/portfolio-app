import axios from "axios";
import cookies from "js-cookie";

axios.defaults.withCredentials = true;


const authToken = cookies.get('auth_token');

// console.log(authToken)
const headers = {
  Accept: 'application/json',
  Authorization: authToken ? `Bearer ${authToken}` : '',
};


// console.log(headers.Authorization)

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers,
});


export default api;
