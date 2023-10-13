import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/category_foods";

export const allCategoryFoods = () => api.get(resource);