import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/likes";

export const allLikes = () => api.get(resource);

export const createLike = (like) => api.post(resource, like);

export const updateLike = (id, like) => api.put(`${resource}/${id}`, food);

export const removeLike = id => api.delete(`${resource}/${id}`);
