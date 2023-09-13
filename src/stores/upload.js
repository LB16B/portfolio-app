import { defineStore } from "pinia";
import { imageUpload } from "../http/upload-api";

// ストアを定義
export const useUploadStore = defineStore("uploadStore", () => {
    // 画像のアップロード関数
    const uploadRecipeImage = async (formData) => {
        try {
            const response = await imageUpload(formData);

            const data = await response.data;
            console.log("アップロード成功:", data);

      // 成功時の処理（必要に応じて追加）

    } catch (error) {
      // エラーメッセージをコンソールに表示し、エラーを再スロー
      // console.error("アップロードエラー:", error);
      throw error;
    }
  };

  // ストアのエクスポート
  return {
    uploadRecipeImage,
  };
});
