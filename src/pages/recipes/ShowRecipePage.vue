<template>
    <main>
        <ShowRecipe :recipes="filteredRecipeId" />
        <Food :foods="selectedFood" />
            <router-link 
                :to="{ name: 'new_review', params: { recipeId: urlParameterRecipeId } }"
                class="mb-12 flex justify-center w-30 py-2"
                >
                レビューを投稿する
            </router-link>
        <Reviews :reviews="filterReview" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe"
import { useReviewStore } from "../../stores/review";
import { useFoodStore } from "../../stores/food";
import { useRoute, useRouter } from 'vue-router';;
import Recipes from '../../components/recipes/Recipes.vue';
import ShowRecipe from '../../components/recipes/ShowRecipe.vue';
import Food from '../../components/foods/Food.vue';
import api from "../../http/api";
import ReviewPage from "../../pages/Reviews/ReviewsPage.vue";
import Reviews from "../../components/reviews/Reviews.vue";



const router = useRouter
const recipeStore = useRecipeStore()
const foodStore = useFoodStore()
const reviewStore = useReviewStore()
const { recipes } = storeToRefs(recipeStore)
const { foods } = storeToRefs(foodStore)
const { reviews } = storeToRefs(reviewStore)
const { fetchAllRecipes } = recipeStore
const { fetchAllFoods } = foodStore
const { fetchAllReviews } = reviewStore
const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllFoods()
    await fetchAllReviews()
});

const route = useRoute();
let urlParameterRecipeId = null;

onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});

const filteredRecipeId = computed(() => {
    return recipes.value.filter(recipe => recipe.id === Number(urlParameterRecipeId));
});


const selectedFood = computed(() => {
    const selected = foods.value.filter(food => food.recipe_id === Number(urlParameterRecipeId));
    return selected;
});

const filterReview = computed(() => {
    return reviews.value.filter(review => review.recipe_id === Number(urlParameterRecipeId));
});



</script>
