<template>
<div  class="p-4 lg:w-1/2 md:w-full">
    <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
        <div class="flex-grow">
            <h2 class="text-gray-900 text-lg title-font font-medium mb-3">材料</h2>
                <div v-for="food in foods" :food="food" :key="food.id" class="flex px-16 border-b-2">
                    <p class="leading-relaxed text-base flex-1">{{ food.ingredient }}</p>
                    <p class="leading-relaxed text-base flex-1"></p>
                    <p class="leading-relaxed text-base flex-1"></p>
                    <p class="leading-relaxed text-base flex-1">{{ food.amount }}</p>
                </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useFoodStore } from '../../stores/food';
import Food from '../foods/Food.vue';

const store = useFoodStore()

const props = defineProps({
    foods: Array,
})
</script>