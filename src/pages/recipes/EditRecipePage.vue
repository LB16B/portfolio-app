<template>
    <main>
        <EditRecipes :recipes="filteredRecipeId" />
        <EditFoods :foods="filteredFoodRecipeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe"
import { useRoute, useRouter } from 'vue-router';;
import Recipes from '../../components/recipes/Recipes.vue';
import EditRecipes from '../../components/recipes/EditRecipes.vue'
import api from "../../http/api";

import Foods from '../../components/foods/Foods.vue'
import { useFoodStore } from '../../stores/food'
import EditFoods from '../../components/foods/EditFoods.vue'


const store = useRecipeStore()
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store
const upload = ref([])

const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const { fetchAllFoods } = foodStore

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllFoods()
});

const route = useRoute();
let urlParameterRecipeId = null;

onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});

const filteredRecipeId = computed(() => {
    return recipes.value.filter(recipe => recipe.id === Number(urlParameterRecipeId));
});


const filteredFoodRecipeId = computed(() => {
    return foods.value.filter(foods => foodStore.recipe_id === Number(urlParameterRecipeId));
})



</script>
