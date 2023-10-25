<template>

<div class="flex w-5/12 ">
    <div class="relative flex-grow w-full mr-4">
        <input v-model="searchQuery" placeholder="レシピを検索" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
    </div>
    <button 
        @click="searchRecipes"
        class="text-white bg-pink-500 border-0 py-2 w-24 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        検索する
    </button>
</div>

</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../components/recipes/Recipes.vue';
import api from "../http/api";

const router = useRouter()
const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
const { fetchAllRecipes } = recipeStore

onMounted(async () => {
    await fetchAllRecipes()
    filteredRecipes.value = recipes.value;
});

const searchQuery = ref(''); // 検索クエリを保持するリフ
const filteredRecipes = ref([]); // フィルタリングされたレシピを保持するリフ

const searchRecipes = () => {
    const query = searchQuery.value.trim().toLowerCase();
     // クエリが空の場合、現在のページにとどまるか、デフォルトのページに遷移できます
     // router.push("/default_route"); // デフォルトのルートに遷移する場合
    if (query === "") {

    } else {

        router.push({ name: 'search_recipe', params: { searchWord: query } });

    }

}

</script>
