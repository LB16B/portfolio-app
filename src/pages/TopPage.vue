
<template>

<iframe
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/5a8fce82-864c-41b6-8469-30df317b244e">
</iframe>




    <main>
        <section class="reactive text-gray-600 body-font bg-opacity-20  bg-red-100 mx-auto w-1/3 relative h-96 mt-32">
            <h2 class="text-gray-600 body-font text-2xl pt-8  font-bold mt-12 w-100 h-20 flex items-center justify-center">離乳食レシピ検索</h2>
            <div class="absolute left-8 top-32 inset-x-0 container  t-6 mx-auto items-center justify-center flex" style="z-index: 3;">
                <div class="flex flex-col" >
                    <CategoryAges
                        class="mb-4"
                        :categoryAges="categoryAges"
                        @categoryAgeSelected="handleCategoryAgeSelected"
                    />
                    <CategoryFoods
                        :categoryFoods="categoryFoods"
                        @categoryFoodSelected="handleCategoryFoodSelected"
                    />
                </div>
            </div>
            <button 
                @click="searchCategoryRecipes"
                class="absolute bottom-8 inset-x-0 m-auto text-white bg-pink-500 border-0 py-2 w-24 focus:outline-none hover:bg-pink-600 rounded text-lg">
                検索する
            </button>
        </section>
        <Recipes :recipes="recipes" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch  } from "vue";
import { storeToRefs } from "pinia"
import { useCategoryAgeStore } from "../stores/categoryage";
import { useCategoryFoodStore } from "../stores/category-food";
import CategoryAges from "../components/categoryAges/CategoryAges.vue";
import CategoryFoods from "../components/categoryFoods/CategoryFoods.vue";
import { useRouter } from 'vue-router';
import { useRecipeStore } from "../stores/recipe";
import Recipes from "../components/recipes/Recipes.vue";
import api from "../http/api";

const { emits } = defineEmits();
const selectedItemAge = ref(null);
const selectedItemFood = ref(null);

const handleCategoryAgeSelected = (selectedAge) => { 
    selectedItemAge.value = selectedAge; 

};

const handleCategoryFoodSelected = (selectedFood) => {
    selectedItemFood.value = selectedFood; 
};

const categoryAgeStore = useCategoryAgeStore()
const { categoryAges } = storeToRefs(categoryAgeStore)
const { fetchAllCategoryAges } = categoryAgeStore

const categoryFoodStore = useCategoryFoodStore()
const { categoryFoods } = storeToRefs(categoryFoodStore)
const { fetchAllCategoryFoods } = categoryFoodStore

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
const { fetchAllRecipes } = recipeStore

onMounted(async () => {
    await fetchAllCategoryAges()
    await fetchAllCategoryFoods()
    await fetchAllRecipes()
});

const router = useRouter();
const searchCategoryRecipes = () => {
    console.log("月齢:", selectedItemAge.value.id);
    console.log("食材:", selectedItemFood.value.id);

    router.push({
        name: 'search_category_recipe',
        params: {
            ageId: selectedItemAge.value.id,
            foodId: selectedItemFood.value.id
        }
    });
};


</script>