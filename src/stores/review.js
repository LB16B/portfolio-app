import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allReviews, createReview } from "../http/review-api";
import { useRouter } from 'vue-router';

export const useReviewStore = defineStore('reviewStore', () => {
    const reviews = ref([]);
    const router = useRouter();

    // データ全件取得
    const fetchAllReviews = async () => {
        const { data } = await allReviews();
        reviews.value = data.data;
    };

    // 新しいデータ作成
    const handleAddedReview = async (newReview) => {
        const { data: createdReview } = await createReview(newReview);

        reviews.value.unshift(createdReview.data);
    }

    return {
        reviews,
        fetchAllReviews,
        handleAddedReview
    }
});