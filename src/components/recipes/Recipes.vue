<template>
    <div class="card mt-2">
        <ul class="list-group list-group-flush">
            <Recipe v-for="recipe in recipes" 
                :recipe="recipe" 
                :key="recipe.id" 
                @updated="$event => $emit('updated', $event)" 
                @removed="$event => $emit('removed', $event)"
            />
        </ul>
    </div>
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