<template>
    <main>

        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div class="relative flex-grow w-full">
                        <input v-model="searchQuery" placeholder="レシピを検索" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                    <button 
                        @click="searchRecipes"
                        class="text-white bg-indigo-500 border-0 py-2 w-24 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        検索する
                    </button>
                </div>
            </div>
        </section>
            <Recipes :recipes="filteredCategoryFoodId" />
        </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";

const store = useRecipeStore();
const { recipes } = storeToRefs(store);
const { fetchAllRecipes } = store;

onMounted(async () => {
    await fetchAllRecipes();
    filteredRecipes.value = recipes.value; // filteredRecipesを空の配列に初期化
});

const searchQuery = ref(''); // 検索クエリを保持する
const filteredRecipes = ref([]); // フィルタリングされたレシピを保持する（空の配列で初期化）

const searchRecipes = () => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) {
        // クエリが空の場合、全てのレシピを表示
        filteredRecipes.value = recipes.value;
    } else {
        filteredRecipes.value = recipes.value.filter((recipe) => 
            recipe.title.toLowerCase().includes(query)
        );
    }
}


const route = useRoute();
let urlParameterCategoryFoodId = null;

onMounted(() => {
    urlParameterCategoryFoodId = route.params.categoryFoodId;
});

const filteredCategoryFoodId = computed(() => {
    return recipes.value.filter(recipe => recipe.category_food_id === Number(urlParameterCategoryFoodId))
})
</script>