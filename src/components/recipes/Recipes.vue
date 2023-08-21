<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <Recipe v-for="recipe in recipes" 
                    :recipe="recipe" 
                    :key="recipe.id" 
                    @updated="$event => $emit('updated', $event)" 
                    @removed="$event => $emit('removed', $event)"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import Recipe from './Recipe.vue'
defineProps({
    recipes: Array,
    show: {
        type: Boolean,
        default: true
    }
})
</script>