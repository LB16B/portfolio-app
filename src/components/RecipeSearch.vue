<template>

<div class="flex w-3/6 relative h-3/4">
    <div class="flex-grow">
        <input v-model="searchQuery" placeholder="レシピを検索" 
            class=" bg-gray-100 w-5/6 bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
    </div>
    <button 
        @click="searchRecipes"
        class="absolute right-0 text-white bg-pink-500 border-0 py-2 w-24 focus:outline-none hover:bg-pink-600 rounded text-lg">
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

const searchQuery = ref('');
const filteredRecipes = ref([]);

const searchRecipes = () => {
    const query = searchQuery.value.trim().toLowerCase();
    if (query !== "") {
        router.push({ name: 'search_recipe', params: { searchWord: query } });
    }

}

</script>
