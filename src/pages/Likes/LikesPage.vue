<template>
    <main>
        <Recipes :recipes="filteredRecipes" />
    </main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLikeStore } from "../../stores/like";
import { useRoute, useRouter } from 'vue-router';
import { useRecipeStore } from "../../stores/recipe";
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";
import { useAuthStore } from '../../stores/auth';


const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const likeStore = useLikeStore()
const recipeStore = useRecipeStore()
const { likes } = storeToRefs(likeStore)
const { recipes } = storeToRefs(recipeStore)
const { fetchAllLikes } = likeStore
const { fetchAllRecipes } = recipeStore


onMounted(async () => {
    await fetchAllLikes()
    await fetchAllRecipes()
});

console.log(authStore)

const filteredRecipes = computed(() => {
    const loggedInUserId = authStore.user.id; // ログイン中のユーザーのID

const filtered = recipes.value.filter(recipe => {
    // ログイン中のユーザーのIDとlikesテーブルのuser_idが一致し、recipe_idも一致する場合のみフィルタリングする
    return likes.value.some(like => like.recipe_id === recipe.id && like.user_id === loggedInUserId);
});

return filtered;
    // const filtered = recipes.value.filter(recipe => {
    //     return likes.value.some(like => like.recipe_id === recipe.id);
    // });

    // return filtered;
});
</script>