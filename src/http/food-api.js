import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/foods";

export const allFoods = () => api.get(resource);

export const createFood = (food) => api.post(resource, food);

export const updateFood = (id, food) => api.put(`${resource}/${id}`, food);
