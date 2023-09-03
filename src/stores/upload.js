import { defineStore } from "pinia";
import { imageUpload } from "../http/upload-api";

export const useUploadStore = defineStore('uploadStore', () => {


    const uploadRecipeImage = async (file) => {
        try {
          const uploadUrl = "http://localhost:8000/api/v2/upload";
          const formData = new FormData();
          formData.append("file", file);



          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            // サーバーからエラーレスポンスが返ってきた場合のエラーハンドリング
            throw new Error("ファイルのアップロードに失敗しました");
          }

          const data = await response.json();

          console.log("アップロード成功:", data);
      
            // 成功時の処理
          } catch (error) {
            console.error("アップロードエラー:", error);
            throw error;
          }
        };

    return {
        uploadRecipeImage,
    };
});