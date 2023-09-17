<template>
    <main>
        <Recipes :recipes="recipes" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";



const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
// const { totalRecipes } = storeToRefs(store)
const { fetchAllRecipes } = recipeStore

const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
});




</script>
