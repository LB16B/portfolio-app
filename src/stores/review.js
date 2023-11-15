import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allReviews, createReview } from "../http/review-api";
import { useRouter, useRoute } from 'vue-router';

export const useReviewStore = defineStore('reviewStore', () => {
    const reviews = ref([]);
    const router = useRouter();
    const route = useRoute()

    // データ全件取得
    const fetchAllReviews = async () => {
        const { data } = await allReviews();
        reviews.value = data.data;
    };

    let urlParameterRecipeId = route.params.recipeId;

    const reviewsCount = computed(() => {
        return reviews.value.filter(review => review.recipe_id === Number(urlParameterRecipeId)).length;
    });

    // 新しいデータ作成
    const handleAddedReview = async (newReview) => {
        const { data: createdReview } = await createReview(newReview);
        reviews.value.unshift(createdReview.data);

        // レビューが追加された後、一つ前のページに戻る
        router.back();
    }

    return {
        reviews,
        fetchAllReviews,
        handleAddedReview,
        reviewsCount
    }
});