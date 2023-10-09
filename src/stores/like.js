import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allLikes, createLike, updateLike, removeLike,} from "../http/like-api";

export const useLikeStore = defineStore('likeStore', () => {
    const likes = ref([]);

    // 全件取得
    const fetchAllLikes = async () => {
        const { data } = await allLikes();
        likes.value = data.data;

    }

    // データ追加
    const handleAddedLike = async (newLike) => {
        try{
            const { data: createdLike } = await createLike(newLike);
            likes.value.unshift(createdLike.data);

            console.log('成功');
        } catch (error) {
            console.error("API リクエストエラー", error);
        }
    }

    // データ削除
    // const handleRemovedLike = async (like) => {
    //     await removeLike(like.id)
    //     const index = likes.value.findIndex(item => item.id === like.id)
    //     likes.value.splice(index, 1)
    //     console.log('削除成功')
    // }
    const handleRemovedLike = async (like) => {
        try {
            await removeLike(like.id);
            const index = likes.value.findIndex(item => item.id === like.id);
            if (index !== -1) {
                likes.value.splice(index, 1);
                console.log('削除成功');
            } else {
                console.warn('削除対象が見つかりませんでした');
            }
        } catch (error) {
            console.error('API リクエストエラー', error);
        }
    };
    

    const likesCount = computed(() => likes.value.length);

    return {
        likes,
        fetchAllLikes,
        handleAddedLike,
        handleRemovedLike,
        likesCount,
    }
});