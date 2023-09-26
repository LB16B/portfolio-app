<template>
    <EditFood v-for="food in foods" 
        :food="food" 
        :key="food.id" 
        @updated="handleUpdatedFood" 
    />
    </template>
    
    <script setup>
    import { useFoodStore } from "../../stores/food";
    import EditFood from "./EditFood.vue";
    
    
    const store = useFoodStore()
    const { handleUpdatedFood } = store
    
    defineProps({
        foods: Array,
        show: {
            type: Boolean,
            default: true
        }
    })
    </script>