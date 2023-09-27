<template>


<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">必要な材料と容量</h1>
        </div>

        <div 
            class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="にんじん"
                        v-model="firstFoodIngredient"
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
                    placeholder="大さじ1"
                    v-model="firstFoodAmount"
                    class="title-font font-medium bg-gray-100">
                </div>
            </div>
        </div>
        
        <button 
            @click="UpdateFood"
            class="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            投稿する
        </button>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </div>
</section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useFoodStore } from "../../stores/food";

const store = useFoodStore()
const { handleUpdatedFood } = store

const emit = defineEmits(["updated"]);

const props = defineProps({
    foods: Array,
})

const firstFoodId = ref(''); 
const firstFoodIngredient = ref('');
const firstFoodAmount = ref('');

// props.foodsが変更された場合にfirstFoodIngredientとfirstFoodAmountを更新
watch(() => props.foods, (newFoods) => {
  if (newFoods.length > 0) {
    firstFoodId.value = newFoods[0].id;
    firstFoodIngredient.value = newFoods[0].ingredient;
    firstFoodAmount.value = newFoods[0].amount;
  } else {
    firstFoodIngredient.value = '';
    firstFoodAmount.value = '';
  }
});


const UpdateFood = async (event) => {

const food = {
    id: firstFoodId.value,
    ingredient: firstFoodIngredient.value,
    amount: firstFoodAmount.value,
};
console.log(food);

handleUpdatedFood(food);

emit("updated", food);
};
</script>