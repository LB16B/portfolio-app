<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
                <EditFood v-for="food in foods"
                    :food="food"
                    :key="food.id"
                    @updated="handleUpdatedFood"
                />
            </div>
        </div>
    </section>
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