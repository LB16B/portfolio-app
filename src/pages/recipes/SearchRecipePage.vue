<template>
    <main>
        <Recipes :recipes="filterRecipe" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";

const store = useRecipeStore()
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store

onMounted(async () => {
    await fetchAllRecipes()
});

const route = useRoute()
let urlParameterSearchWord = null;

const filterRecipe = computed(() => {
    return recipes.value.filter(recipe => recipe.title === route.params.searchWord);
})


</script>