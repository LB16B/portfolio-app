<template>
    <main>
        <NewRecipe />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import Recipes from '../../components/recipes/Recipes.vue';
import NewRecipe from "../../components/recipes/NewRecipe.vue";
import api from "../../http/api";



const store = useRecipeStore()
const { recipes } = storeToRefs(store)
// const { totalRecipes } = storeToRefs(store)
const { fetchAllRecipes } = store

const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
});




</script>
