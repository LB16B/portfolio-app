<template>

</template>

<script setup>
import { useFoodStore } from '../../stores/food';
import EditFood from './EditFood.vue';

const store = useFoodStore()
const { handleUpdatedFood } = store

defineProps({
    foods: Array,
})
</script>