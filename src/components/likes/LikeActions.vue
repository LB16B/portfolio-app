
<template>
    <div class="flex items-center justify-center">
        レシピを保存する
        <div 
            v-if="filteredLike.length === 0"
            class="flex items-center justify-center"
            >
            <button 
                class="rounded-full w-10 h-10 bg-red-100 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-red-200"
                @click="addNewLike"
            >
                <img src="../../../public/heartAdd.png" class="w-8 h-8 opacity-70 mt-1 hover:opacity-90">
                <meta name="csrf-token" content="{{ csrf_token() }}">
            </button>
        </div>
        <div v-else>
            <button 
                class="rounded-full w-10 h-10 bg-red-100 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-red-200"
                @click="removeLike"
            >
                <img src="../../../public/heartRemove.png" class="w-8 h-8 opacity-70 mt-1 hover:opacity-90">
                <meta name="csrf-token" content="{{ csrf_token() }}">
            </button>
        </div>
        <span class="title-font   text-gray-900 text-2xl font-normal ml-4 opacity-80">{{ likesCount }}</span>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
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
const { handleAddedLike, handleRemovedLike, fetchAllLikes } = likeStore

const route = useRoute();
const inputtingUserId = userStore.user.id
const inputtingRecipeId = ref(route.params.recipeId);


const likesCount = computed(() => likeStore.likesCount);


let urlParameterRecipeId = route.params.recipeId;
const userId = userStore.user.id
const filteredLike = computed(() => {
    return props.likes.filter(
        like => like.recipe_id === Number(urlParameterRecipeId)
        && like.user_id === Number(userId)
        )
    })



    const filteredLikeRecipeIds = computed(() => {
        return filteredLike.value.map(like => like.recipe_id);
    }) 

    const filteredLikeIds = ref([]);
    const updateFilteredLikeIds = () => {
        filteredLikeIds.value = filteredLike.value.map(like => like.id);
    };

    watch(filteredLike, () => {
        updateFilteredLikeIds();
    });


    const addNewLike = async(event) => {
        newLike.recipe_id = inputtingRecipeId
        newLike.user_id = inputtingUserId
        
        try {
            await handleAddedLike(newLike)
            fetchAllLikes();
        } catch (error) {
            console.log('失敗', error)
        }
    }

    const removeLike = async() => {
        const likeIdToRemove = filteredLikeIds.value[0];

    try {
        await handleRemovedLike({ id: likeIdToRemove });
    } catch (error) {
        console.log('削除失敗', error);
    }
}

</script>