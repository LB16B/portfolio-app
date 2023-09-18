<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <Recipe v-food in foods" 
                    :food="food" 
                    :key="food.id" 
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
import { useFoodStore } from '../../stores/food';
import Food from '../foods/Food.vue';

const foodStore = useFoodStore()
// const { handleUpdatedRecipe, handleRemovedRecipe } = recipeStore

defineProps({
    foods: Array,
    show: {
        type: Boolean,
        default: true
    }
})
</script>