<template>
    <main>
        <ShowRecipe :recipes="filteredRecipeId" />

        <section  class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4 px-32">
                    <Foods :foods="selectedFood" />
                    <Manuals :manuals="filterManual" />
                </div>
            </div>
        </section>
   
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
import { useManualStore } from "../../stores/manual";
import { useRoute, useRouter } from 'vue-router';;
import Recipes from '../../components/recipes/Recipes.vue';
import ShowRecipe from '../../components/recipes/ShowRecipe.vue';
import Foods from '../../components/foods/Foods.vue';
import Manuals from "../../components/manuals/manuals.vue";
import api from "../../http/api";
import ReviewPage from "../../pages/Reviews/ReviewsPage.vue";
import Reviews from "../../components/reviews/Reviews.vue";



const router = useRouter
const recipeStore = useRecipeStore()
const foodStore = useFoodStore()
const reviewStore = useReviewStore()
const manualStore = useManualStore()
const { recipes } = storeToRefs(recipeStore)
const { foods } = storeToRefs(foodStore)
const { reviews } = storeToRefs(reviewStore)
const { manuals } = storeToRefs(manualStore)
const { fetchAllRecipes } = recipeStore
const { fetchAllFoods } = foodStore
const { fetchAllReviews } = reviewStore
const { fetchAllManuals } = manualStore
const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllFoods()
    await fetchAllReviews()
    await fetchAllManuals()
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

const filterManual = computed(() => {
    return manuals.value.filter(manual => manual.recipe_id === Number(urlParameterRecipeId));
});



</script>
