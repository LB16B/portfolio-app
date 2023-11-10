
<template>
    <div>
        <button 
            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            @click="addNewLike"
        >
            追加
            <meta name="csrf-token" content="{{ csrf_token() }}">
        </button>
    </div>
    <div >
        <button 
            class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            @click="removeLike"
        >
            消す
            <meta name="csrf-token" content="{{ csrf_token() }}">
        </button>
    </div>
    <span class="title-font font-medium  text-gray-900">ブックマーク数：{{ likesCount }}件</span>
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
console.log('カウント', likesCount.value)


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

    updateFilteredLikeIds();

    watch(filteredLike, () => {
    updateFilteredLikeIds();
    if (filteredLike.value.length >= 1 && filteredLike.value[0].id !== undefined) {
        console.log('a', filteredLike.value[0].id);
    } else {
        console.log('none');
    }
});


    const addNewLike = async(event) => {
        newLike.recipe_id = inputtingRecipeId
        newLike.user_id = inputtingUserId
        
        try {
            await handleAddedLike(newLike)
            fetchAllLikes();
            // likesCount.value += 1;
        } catch (error) {
            console.log('失敗', error)
        }
        console.log('カウントadd', likesCount.value +1)
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