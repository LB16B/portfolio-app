import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allLikes, createLike, updateLike } from "../http/like-api";

export const useLikeStore = defineStore('likeStore', () => {
    const likes = ref([]);

    // 全件取得
    const fetchAllLikes = async () => {
        const { data } =await allLikes();
        useLikeStore.value = data.data;
    }

    // データ追加
    const handleAddedLike = async (newLike) => {
        try{
            const { data: createdLike } = await createLike(newLike);
            useLikeStore.value.unshift(createdLike.data);

            console.log('成功');
        } catch (error) {
            console.error("API リクエストエラー", error);
        }
    }

    // データ削除
    const handleRemovedLike = async (like) => {
        await removeLike(like.id)
        const index = likes.value.findIndex(item => item.id === like.id)
        likes.value.splice(index, 1)
    }

    return {
        likes,
        fetchAllLikes,
        handleAddedLike,
        handleRemovedLike
    }
});