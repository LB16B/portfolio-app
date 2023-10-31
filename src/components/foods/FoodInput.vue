<template>
  <div class="p-2 sm:w-1/2 w-full">
    <div class="bg-gray-100 rounded flex p-4 h-full items-center">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
        <input 
            type="text" 
            v-model="firstFoodIngredient"
            class="title-font font-medium bg-gray-100">
    </div>
</div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";


import FoodInput from './FoodInput.vue'
import { useFoodStore } from "../../stores/food";


const store = useFoodStore()
const { handleUpdatedFood } = store

const emit = defineEmits(["updated"]);



const { placeholder, vModel } = defineProps("vModel"]);

const firstFoodIngredient = ref('');

watch(vModel, (newValue) => {
  firstFoodIngredient.value = newValue;
});
</script>