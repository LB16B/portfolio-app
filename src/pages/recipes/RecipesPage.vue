<template>
    <main>
        <Recipes :recipes="filteredCategoryAgeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
const { fetchAllRecipes } = recipeStore

const upload = ref([])


onMounted(async () => {
    await fetchAllRecipes()
    filteredRecipes.value = recipes.value;
});

const searchQuery = ref(''); // 検索クエリを保持するリフ
const filteredRecipes = ref([]); // フィルタリングされたレシピを保持するリフ

const searchRecipes = () => {
    // 検索クエリに基づいてレシピをフィルタリング
    const query = searchQuery.value.trim().toLowerCase();
    if (query === "") {
        filteredRecipes.value = recipes.value; // クエリが空の場合、すべてのレシピを表示
    } else {
        filteredRecipes.value = recipes.value.filter((recipe) =>
            recipe.title.toLowerCase().includes(query)
        );
    }
    filteredRecipes.value = recipes.value.filter((recipe) =>
        recipe.title.toLowerCase().includes(query)
    );
}



const route = useRoute();
let urlParameterCategoryAgeId = null;

onMounted(() => {
    urlParameterCategoryAgeId = route.params.categoryAgeId;
});

const filteredCategoryAgeId = computed(() => {
    return recipes.value.filter(recipe => recipe.category_age_id === Number(urlParameterCategoryAgeId))
})

</script>
