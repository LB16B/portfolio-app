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
                    placeholder="にんじん"
                    v-model="inputtingIngredient"
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
                    v-model="inputtingAmount"
                    class="title-font font-medium bg-gray-100">
                </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Coloring Book Ethical</span>
                </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Typewriter Polaroid Cray</span>
                </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Pack Truffaut Blue</span>
                </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">The Catcher In The Rye</span>
                </div>
            </div>
            </div>
            <button 
                @click="addNewFood"
                class="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
                投稿する
            </button>
            <meta name="csrf-token" content="{{ csrf_token() }}">
        </div>
        </section>
    </template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useFoodStore } from '../../stores/food';
import { useRouter } from 'vue-router'; // Vue RouterからuseRouterをインポート

const newFood = reactive({
    ingredient: '',
    amount: '',
    recipe_id: '', 
})

const router = useRouter(); // useRouterを使用してVue Routerを初期化

// ページがマウントされたときに実行されるコード
onMounted(() => {
    // URLからrecipe_idパラメーターの値を取得
    const route = router.currentRoute.value;
    const recipeId = route.params.recipe_id;

    // 取得したrecipe_idをnewFoodに設定
    newFood.recipe_id = recipeId;

    console.log(newFood.recipe_id)
});


const foodStore = useFoodStore()
const { handleAddedFood } = foodStore

const inputtingIngredient = ref('')
const inputtingAmount = ref('')
const inputtingRecipeId = ref('')



const addNewFood = async () => {
    try {
    // 新しい食材データのフォーマットを準備
        const newFoodData = {
            ingredient: inputtingIngredient.value,
            amount: inputtingAmount.value,
        };

        // データベースにデータを送信
        await handleAddedFood(newFoodData);

        // データベースへの保存が成功したら入力フィールドをクリア
        inputtingIngredient.value = '';
        inputtingAmount.value = '';
    } catch (error) {
        console.error('エラー', error);
    }
};
</script>