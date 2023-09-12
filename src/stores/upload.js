import { defineStore } from "pinia";
import { imageUpload } from "../http/upload-api";

// ストアを定義
export const useUploadStore = defineStore("uploadStore", () => {
  // 画像のアップロード関数
  const uploadRecipeImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await imageUpload(formData);

      if (!response.ok) {
        // サーバーからエラーレスポンスが返ってきた場合のエラーハンドリング
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
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
