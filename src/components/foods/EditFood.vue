<template>

    
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">必要な材料と容量</h1>
        </div>

        <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        v-focus
                        v-model="editingIngredient"
                        class="title-font font-medium bg-gray-100">
                </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    v-focus
                    v-model="editingAmount"
                    class="title-font font-medium bg-gray-100">
                </div>
            </div>
        </div>
        
        <!-- <button 
            @click="addNewFood"
            class="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            投稿する
        </button>
        <meta name="csrf-token" content="{{ csrf_token() }}"> -->
    </div>
</section>
</template>

<script setup>
import { ref, computed } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { useFoodStore } from "../../stores/food";

const foodStore = useFoodStore()

const props = defineProps({
    food: Object,
})

const emit = defineEmits('updated')

const isEdit = ref(false)
const editingIngredient = ref(props.food.ingredient)
const editingAmount = ref(props.food.amount)

const vFocus = {
    mounted: (el) => el.focus()
}


</script>