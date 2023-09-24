<template>
<EditRecipe v-for="recipe in recipes" 
    :recipe="recipe" 
    :key="recipe.id" 
    @updated="handleUpdatedRecipe" 
    @removed="handleRemovedRecipe"
/>
</template>

<script setup>
import { useRecipeStore } from "../../stores/recipe";
import EditRecipe from "./EditRecipe.vue";


const store = useRecipeStore()
const { handleUpdatedRecipe, handleRemovedRecipe } = store

defineProps({
    recipes: Array,
    show: {
        type: Boolean,
        default: true
    }
})
</script>