import { defineStore } from "pinia";
import { userProfileImageUpload } from "../http/user-profile-upload-api";
import cookies from "js-cookie";
import { csrfCookie } from "../http/auth-api";

export const useProfileImageUploadStore = defineStore("uploadStore", () => {

    const uploadUserProfileImage = async (formData) => {
      await csrfCookie();
        try {
            const response = await userProfileImageUpload(formData);

            const data = await response.data;
            console.log("アップロード成功:", data);

    } catch (error) {
      console.error("アップロードエラー:", error);
      throw error;
    }
  };
  return {
    uploadUserProfileImage,
  };
});