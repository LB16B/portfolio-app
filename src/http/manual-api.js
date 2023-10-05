import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/manuals";

export const allManuals = () => api.get(resource);

export const createManual = (manual) => api.post(resource, manual);

export const updateManual = (id, manual) => api.put(`${resource}/${id}`, manual);