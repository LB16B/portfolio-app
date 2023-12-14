<template>
<div class="text-gray-600 body-font mt-24 relative">
<div class="container px-5 pt-11 mx-auto">
    <div class="flex flex-col text-center w-full">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">レビューを書く</h1>
        <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
    </div>
</div>
</div>

<section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">

        <div class="p-2 w-full">
            <div class="relative">
            <label for="name" class="leading-7 text-sm text-gray-600">評価</label>
            <input 
                type="number" 
                placeholder="3"
                v-model="inputtingScore"
                @input="validateScore"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
            <p v-if="scoreError" class="text-red-500 text-xs mt-1">{{ scoreError }}</p>
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">本文</label>
            <textarea
                placeholder="生後5ヶ月の息子が喜んで食べていました！また作ります！"
                v-model="inputtingBody"
                class="w-full h-32 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
            </div>
        </div>

        <div class="p-2 w-full">
            <button 
            @click="addNewReview"
            class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
            >
            投稿する
            </button>
            <meta name="csrf-token" content="{{ csrf_token() }}">
            
        </div>
        </div>
    </div>
    </div>
</section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRecipeStore } from '../../stores/recipe';
import { useRoute, useRouter } from 'vue-router';
import { useReviewStore } from '../../stores/review';
import api from "../../http/api";
import { useAuthStore } from '../../stores/auth';
import { nl2br } from '../../common';

const newReview = reactive({
    score: '',
    body: '',
    recipe_id: '',
    user_id: ''
})

const router = useRouter()
const userStore = useAuthStore()
const store = useReviewStore()
const { handleAddedReview  } = store

const inputtingScore = ref('')
const inputtingBody = ref('')
const inputtingUserId = userStore.user.id

const route = useRoute();
const inputtingRecipeId = ref(route.params.recipeId);
const scoreError = ref('')

const validateScore = () => {
  const score = inputtingScore.value;
  if (isNaN(score) || score === '') {
    scoreError.value = '数字を入力してください';
  } else if (!Number.isInteger(parseFloat(score))) {
    scoreError.value = '整数で入力してください';
  } else {
    scoreError.value = '';
  }
};


const addNewReview = async(event) => {
    newReview.score = inputtingScore.value
    newReview.body = nl2br(inputtingBody.value)
    newReview.recipe_id = inputtingRecipeId.value
    newReview.user_id = inputtingUserId

    try {
        await handleAddedReview(newReview);
        console.log('投稿成功')
    } catch (error) {
        console.log('投稿エラー', error)
    }


}

</script>