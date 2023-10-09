import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
const resource = apiPath + "/change_password";

export const changePassword = (user) => api.put(resource, user);
