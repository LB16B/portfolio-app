<template>
<section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
        <div v-for="recipe in recipes" :recipe="recipe" :key="recipe.id"  class="lg:w-4/5 mx-auto flex flex-wrap">
        <img alt="recipe image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="getImagePath(recipe.filename)">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ recipe.title }}</h1>
            <div class="flex mb-4">
                <span class="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span class="text-gray-600 ml-3">{{ reviewsCount }}件のレビュー{{averageScore}} /{{  displayStars(averageScore)  }}</span>
                </span>
            </div>
            <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                    <span class="mr-3">所要時間：{{ recipe.time }}分 /</span><span>費用目安：{{ recipe.price }}円</span>
                </div>
            </div>
  
            <!-- <LikesPage /> -->
            <LikeActionsPage />
        </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRecipeStore } from "../../stores/recipe";
import { storeToRefs } from "pinia";
import api from "../../http/api";
import { useLikeStore } from "../../stores/like";
import LikesPage from "../../pages/Likes/LikesPage.vue";
import { useReviewStore } from "../../stores/review";
import LikeActionsPage from "../../pages/Likes/LikeActionsPage.vue";


defineProps({
    recipes: Array,
})

const likeStore = useLikeStore();
const likesCount = computed(() => likeStore.likesCount);
const reviewStore = useReviewStore();
const { fetchAllReviews } = reviewStore
const reviewsCount = computed(() => reviewStore.reviewsCount);


const recipeStore = useRecipeStore()
const { handleUpdatedRecipe, handleRemovedRecipe } = recipeStore

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
    return path + filename;
}

const averageScore = computed(() => {
    if (reviewStore.reviews.length === 0) return 0;

    const totalScore = reviewStore.reviews.reduce((accumulator, review) => {
        return accumulator + review.score;
    }, 0);

    return (totalScore / reviewStore.reviews.length).toFixed(1);
});

const displayStars = (score) => {
    if (score === 0) {
        return '☆☆☆☆☆'; // 0 の場合、星なしとして扱います
    } else if (score >= 1 && score < 2 ) {
        return '★☆☆☆☆';
    } else if (score >= 2 && score < 3) {
        return '★★☆☆☆';
    } else if (score >= 3 && score < 4) {
        return '★★★☆☆';
    } else if (score >= 4 && score < 5) {
        return '★★★★☆';
    } else if (score >= 5) {
        return '★★★★★';
    } else {
        return ''; // エラーがある場合などに空の文字列を返すなど、必要に応じて処理を追加できます
    }
};
</script>
