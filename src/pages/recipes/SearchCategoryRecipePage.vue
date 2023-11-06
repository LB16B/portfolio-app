<template>
    <main>
        <Recipes :recipes="filteredCategoryAgeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../../components/recipes/Recipes.vue';
import { useCategoryFoodStore } from "../../stores/category-food";
import CategoryFoods from "../../components/categoryFoods/CategoryFoods.vue";
import api from "../../http/api";

const store = useRecipeStore()
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store
const categoryFoodStore = useCategoryFoodStore()
const { categoryFoods } = storeToRefs(categoryFoodStore)
const { fetchAllCategoryFoods } = categoryFoodStore

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllCategoryFoods()
});


const route = useRoute();
let urlParameterAgeId = null;
let urlParameterFoodId = null;

onMounted(() => {
    urlParameterAgeId = route.params.ageId;
    urlParameterFoodId = route.params.foodId;
    // categoryFoods.value.forEach((categoryFood) => {
    //     console.log(categoryFood.name);
    // });
});

const filteredCategoryAgeId = computed(() => {
    return recipes.value.filter(
        recipe => recipe.category_age_id === Number(urlParameterAgeId) &&
        recipe.category_food_id === Number(urlParameterFoodId) 
        )
})

</script>