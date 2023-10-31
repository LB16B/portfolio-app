import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/upload";

export const imageUpload = (upload) => api.post(resource, upload);
