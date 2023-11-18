<template>
    <main>
        <NewRecipe />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useFoodStore } from '../../stores/food';
import Recipes from '../../components/recipes/Recipes.vue';
import NewRecipe from "../../components/recipes/NewRecipe.vue";
import NewFood from '../../components/foods/NewFood.vue'
import api from "../../http/api";

const recipeStore = useRecipeStore()
const foodStore = useFoodStore()
const { recipes } = storeToRefs(recipeStore)
const { foods } = storeToRefs(foodStore)
const { fetchAllRecipes } = recipeStore
const { fetchAllFoods } = foodStore

const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllFoods()
});




</script>
