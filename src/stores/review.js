import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allReviews } from "../http/review-api";
import { useRouter } from 'vue-router';

export const useReviewStore = defineStore('reviewStore', () => {
    const reviews = ref([]);
    const router = useRouter();

    // データ全件取得
    const fetchAllReviews = async () => {
        const { data } = await allReviews();
        reviews.value = data.data;
    };

    return {
        reviews,
        fetchAllReviews
    }
});