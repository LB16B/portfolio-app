import api from "./api"

const apiPath = import.meta.env.VITE_API_PATH_FREE
const resource = apiPath + "/recipes"

export const allRecipes = () => api.get(resource);

export const 