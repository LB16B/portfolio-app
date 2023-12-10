<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 mx-auto">
            <div class="flex flex-wrap -m-4">
                <MyRecipe v-for="recipe in recipes" 
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
import MyRecipe from "./MyRecipe.vue";

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