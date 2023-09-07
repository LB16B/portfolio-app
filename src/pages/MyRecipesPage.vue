<template>
    <main>
        <h1>投稿済みレシピ</h1>
        <Recipes :recipes="filteredRecipes" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Recipes from '../components/recipes/Recipes.vue';
import NewRecipe from "../components/recipes/NewRecipe.vue";
import api from "../http/api";

const store = useRecipeStore()
const auth_store = useAuthStore()
const router = useRouter
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store

onMounted(async () => {
    await fetchAllRecipes()
});

const filteredRecipes = computed(() => {
    const loggedInUserName = auth_store.user.id;
    return recipes.value.filter(recipe => recipe.user_id === loggedInUserName);
});



</script>
