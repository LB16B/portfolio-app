<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <EditRecipe v-for="recipe in recipes" 
                    :recipe="recipe" 
                    :key="recipe.id" 
                    @updated="handleUpdatedRecipe" 
                    @removed="handleRemovedRecipe"
                />
            </div>
        </div>
    </section>
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