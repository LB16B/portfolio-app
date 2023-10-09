<!-- <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
</svg> -->
<template>
    {{ likesFilter.length }}

    <div>
        <button 
            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            @click="addNewLike"
        >
            赤
            <meta name="csrf-token" content="{{ csrf_token() }}">
        </button>
    </div>

    <div>
        <button 
            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            @click="removeLike"
        >
            青
            <meta name="csrf-token" content="{{ csrf_token() }}">
        </button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useLikeStore } from '../../stores/like';
import { useAuthStore } from '../../stores/auth';
import api from "../../http/api";

const props = defineProps({
    likes: Array
})

const newLike = reactive({
    id: '',
    recipe_id: '',
    user_id: ''
})

const router = useRouter()
const userStore = useAuthStore()
const likeStore = useLikeStore()
const { handleAddedLike, handleRemovedLike } = likeStore

const route = useRoute();
const inputtingUserId = userStore.user.id
const inputtingRecipeId = ref(route.params.recipeId);


const addNewLike = async(event) => {
    newLike.recipe_id = inputtingRecipeId
    newLike.user_id = inputtingUserId

    try {
        await handleAddedLike(newLike)
        console.log('成功')
    } catch (error) {
        console.log('失敗', error)
    }
}

// パラ―メータ取得
let urlParameterRecipeId = route.params.recipeId;

const likesFilter = props.likes.filter(
    like => like.recipe_id === Number(urlParameterRecipeId)
    &&
    like.user_id === Number(inputtingRecipeId.value)
);
console.log(props.likes)



</script>