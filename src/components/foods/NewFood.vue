<template>
<section class="text-gray-600 body-font ">
    <div class="container px-5 py-24 mx-auto bg-red-50 w-2/3 mt-32 rounded-xl">
        <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">必要な材料と容量</h1>
        </div>

 





        <div class="flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2   items-center flex">
            <div class="p-2 sm:w-1/2 w-full h-18 flex items-center ">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="冷凍ほうれん草"
                        v-model="inputtingIngredient1"
                        class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >

            </div>
            <div class="p-2 w-1/2 ">
                <div class="w-full h-18 flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    placeholder="10g"
                    v-model="inputtingAmount1"
                    class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                </div>
            </div>
        </div>

        <div class="flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2   items-center flex">
            <div class="p-2 sm:w-1/2 w-full h-18 flex items-center ">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="さつまいも(皮むき)"
                        v-model="inputtingIngredient2"
                        class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >

            </div>
            <div class="p-2 w-1/2 ">
                <div class="w-full h-18 flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    placeholder="20"
                    v-model="inputtingAmount2"
                    class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                </div>
            </div>
        </div>

        <div class="flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2   items-center flex">
            <div class="p-2 sm:w-1/2 w-full h-18 flex items-center ">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="にんじん"
                        v-model="inputtingIngredient3"
                        class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >

            </div>
            <div class="p-2 w-1/2 ">
                <div class="w-full h-18 flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    placeholder="1本"
                    v-model="inputtingAmount3"
                    class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                </div>
            </div>
        </div>

        <div class="flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2   items-center flex">
            <div class="p-2 sm:w-1/2 w-full h-18 flex items-center ">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="昆布"
                        v-model="inputtingIngredient4"
                        class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >

            </div>
            <div class="p-2 w-1/2 ">
                <div class="w-full h-18 flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    placeholder="2枚"
                    v-model="inputtingAmount4"
                    class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                </div>
            </div>
        </div>

        <div class="flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2   items-center flex">
            <div class="p-2 sm:w-1/2 w-full h-18 flex items-center ">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <input 
                        type="text" 
                        placeholder="絹豆腐"
                        v-model="inputtingIngredient5"
                        class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >

            </div>
            <div class="p-2 w-1/2 ">
                <div class="w-full h-18 flex items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-pink-400 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <input 
                    type="text" 
                    placeholder="100g"
                    v-model="inputtingAmount5"
                    class="h-18 w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                </div>
            </div>
        </div>



        <button 
            @click="addNewFood"
            class="flex mx-auto mt-16 text-white bg-pink-400 border-0 py-2 px-8 focus:outline-none hover:bg-pink-500 rounded text-lg">
            調理手順の記入へ進む
        </button>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </div>
    </section>
</template>

    

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useFoodStore } from '../../stores/food';
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

const newFood = reactive({
    ingredient: '',
    amount: '',
    recipe_id: '', 
})

const router = useRouter();

onMounted(() => {
    const route = router.currentRoute;
    const recipeId = route.value.params.recipe_id;
});


// URLからrecipe_idパラメーターの値を取得
const route = router.currentRoute;
const recipeId = route.value.params.recipe_id;

const foodStore = useFoodStore()
const { handleAddedFood } = foodStore

const inputtingIngredient = ref('')
const inputtingAmount = ref('')
const inputtingIngredient2 = ref('')
const inputtingAmount2 = ref('')
const inputtingIngredient3 = ref('')
const inputtingAmount3 = ref('')
const inputtingIngredient4 = ref('')
const inputtingAmount4 = ref('')
const inputtingIngredient5 = ref('')
const inputtingAmount5 = ref('')

onBeforeRouteUpdate((to, from, next) => {
    const recipeId = to.params.recipe_id;
    next();
});

const addNewFood = async () => {
    try {
        const foodItems = [
            { ingredient: inputtingIngredient, amount: inputtingAmount },
            { ingredient: inputtingIngredient2, amount: inputtingAmount2 },
            { ingredient: inputtingIngredient3, amount: inputtingAmount3 },
            { ingredient: inputtingIngredient4, amount: inputtingAmount4 },
            { ingredient: inputtingIngredient5, amount: inputtingAmount5 }
        ];

        const promises = foodItems.map(async (foodItem) => {
            const newFoodData = {
                ingredient: foodItem.ingredient.value,
                amount: foodItem.amount.value,
                recipe_id: recipeId
            };
            await handleAddedFood(newFoodData);
        });
        // 全てにhandleAddedFoodを呼び出す
        await Promise.all(promises);

        // ループでリファレンスをクリア
        foodItems.forEach((foodItem) => {
            foodItem.ingredient.value = '';
            foodItem.amount.value = '';
        });
    } catch (error) {
        console.error('エラー', error);
    }
};



</script>