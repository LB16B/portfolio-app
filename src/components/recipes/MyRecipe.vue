<template>
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
        <router-link :to="{ name: 'edit_food', params: { recipeId: recipe.id } }">
            <a class="block relative h-48 rounded overflow-hidden">
                <img 
                    alt="recipe image" 
                    class="object-cover object-center w-full h-full block" 
                    :src="getImagePath(recipe.filename)"
                >
            </a>
            <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{{ recipe.title }}</h3>
                <h2 class="text-gray-900 title-font text-lg font-medium">{{ recipe.title }}</h2>
                <span class="mt-1 mr-3">{{ recipe.time }}分</span><span class="mt-1">{{ recipe.price }}円</span>
            </div>
        </router-link>
    </div>
    
    
</template>

<script setup>
import { ref, computed } from "vue";
import { useRecipeStore } from "../../stores/recipe";
import RecipeActions from './RecipeActions.vue';

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
    return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

</script>



