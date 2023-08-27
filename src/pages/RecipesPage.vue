<template>
    <main>
        <div>
            <div>
                <div>
                    <NewRecipe />
                    <!-- List of Recipes -->
                    
                    <Recipes :recipes="recipes" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../stores/recipe";
import Recipes from '../components/recipes/Recipes.vue';
import NewRecipe from "../components/recipes/NewRecipe.vue";


const store = useRecipeStore()
const { recipes } = storeToRefs(store)
// const { totalRecipes } = storeToRefs(store)
const { fetchAllRecipes } = store

onMounted(async () => {
    await fetchAllRecipes()
});




</script>
