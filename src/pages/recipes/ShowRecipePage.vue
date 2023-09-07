<template>
    <main>
        <h1>レシピ詳細</h1>
        <ShowRecipes :recipes="filteredRecipeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe"
import { useRoute, useRouter } from 'vue-router';;
import Recipes from '../../components/recipes/Recipes.vue';
import ShowRecipes from '../../components/recipes/ShowRecipes.vue';
import api from "../../http/api";


const store = useRecipeStore()
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store
const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
});

const route = useRoute();
let urlParameterRecipeId = null;

// URL パラメーターの取得はコンポーネントがマウントされた後に行う
onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});
const filteredRecipeId = computed(() => {
    // return recipes.value.filter(recipe => recipe.id === urlParameterRecipeId)
    return recipes.value.filter(recipe => recipe.id === Number(urlParameterRecipeId));
});



</script>
