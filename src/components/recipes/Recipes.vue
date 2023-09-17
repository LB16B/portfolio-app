<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <Recipe v-for="recipe in recipes" 
                    :recipe="recipe" 
                    :key="recipe.id" 
                    @updated="handleUpdatedRecipe" 
                    @removed="handleRemovedRecipe"
                />
            </div>
        </div>
    </section>
    <!-- <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <Food v-for="food in foods" 
                    :food="food" 
                    :key="food.id" 
                />
            </div>
        </div>
    </section> -->
</template>

<script setup>
import { useRecipeStore } from "../../stores/recipe";
// import { useFoodStore } from '../../stores/food';
import Recipe from "./Recipe.vue";
// import Food from '../foods/Food.vue';

const recipeStore = useRecipeStore()
// const foodStore = useFoodStore()
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