<template>
    <main>

    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Master Cleanse Reliac Heirloom</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep.</p>
            </div>
            <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">

            <div class="relative flex-grow w-full">
                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            </div>
        </div>
    </section>

    <div>
        <input v-model="searchQuery" placeholder="レシピを検索">
        <button @click="searchRecipes">検索</button>
      </div>
        <Recipes :recipes="filteredRecipes" />
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
    // ページが最初に開かれたときもすべてのレシピを表示
    filteredRecipes.value = recipes.value;
});

const searchQuery = ref(''); // 検索クエリを保持するリフ
const filteredRecipes = ref([]); // フィルタリングされたレシピを保持するリフ

const searchRecipes = () => {
    // 検索クエリに基づいてレシピをフィルタリング
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        filteredRecipes.value = recipes.value; // クエリが空の場合、すべてのレシピを表示
    } else {
        filteredRecipes.value = recipes.value.filter((recipe) =>
            recipe.title.toLowerCase().includes(query)
        );
    }
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
