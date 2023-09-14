import { defineStore } from "pinia";
import { imageUpload } from "../http/upload-api";


export const useUploadStore = defineStore("uploadStore", () => {

    const uploadRecipeImage = async (formData) => {
        try {
            const response = await imageUpload(formData);

            const data = await response.data;
            console.log("アップロード成功:", data);

    } catch (error) {
      console.error("アップロードエラー:", error);
      throw error;
    }
  };
  return {
    uploadRecipeImage,
  };
});