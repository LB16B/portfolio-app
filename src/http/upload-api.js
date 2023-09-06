import api from "./api";

export const imageUpload = (upload) => api.post('/api/v2/upload', upload);
