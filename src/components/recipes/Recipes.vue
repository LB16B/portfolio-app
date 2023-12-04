<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap  mx-auto pl-24">
                <Recipe v-for="recipe in recipes" 
                    :recipe="recipe" 
                    :key="recipe.id" 
                    @updated="handleUpdatedRecipe" 
                    @removed="handleRemovedRecipe"
                    class=""
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRecipeStore } from "../../stores/recipe";
import Recipe from "./Recipe.vue";

const recipeStore = useRecipeStore()
const { handleUpdatedRecipe, handleRemovedRecipe } = recipeStore

defineProps({
    recipes: Array,
    // foods: Array,
    show: {
        type: Boolean,
        default: true
    }
})
</script>