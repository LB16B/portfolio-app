import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/profile_image_upload";

export const userProfileImageUpload = (upload) => api.post(resource, upload);
