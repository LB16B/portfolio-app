
<template>


    <main>
        <section class="reactive text-gray-600 body-font bg-opacity-20 rounded-lg  bg-red-100 mx-auto md:w-2/3 lg:w-1/2 xl:w-1/3 relative h-80 mt-20">
            <h2 class="text-gray-600 body-font text-2xl pt-8  font-bold mt-12 w-100 h-20 flex items-center justify-center">離乳食レシピ検索</h2>
            <div class="absolute z-50 top-28 inset-x-0 container mt-4">
                <div class="mx-auto flex items-center justify-center " >
                    <CategoryAges
                        class="absolute -top-8 md:left-16 xl:left-0   mx-auto z-50"
                        :categoryAges="categoryAges"
                        @categoryAgeSelected="handleCategoryAgeSelected"
                    />
                </div>
            </div>
            <div>
                <CategoryFoods
                    class="absolute top-24   mx-auto flex items-center justify-center z-40"
                    :categoryFoods="categoryFoods"
                    @categoryFoodSelected="handleCategoryFoodSelected"
                />

            </div>
            <button 
                @click="searchCategoryRecipes"
                class="absolute bottom-8 inset-x-0 m-auto text-white bg-pink-500 border-0 py-2 w-24 focus:outline-none hover:bg-pink-600 rounded text-lg">
                検索する
            </button>
        </section>

        <div class=" md:w-full  xl:w-4/5 mx-auto  flex items-center justify-center ">
            <Recipes :recipes="recipes" class="  mx-auto flex items-center justify-center ml-20" />
        </div>
    </main>

    <div>
        <!-- <df-messenger
          intent="WELCOME"
          chat-title="aisatsu"
          agent-id="5a8fce82-864c-41b6-8469-30df317b244e"
          language-code="ja"
        ></df-messenger> -->
      </div>
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
import 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';

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