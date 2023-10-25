
<template>
    <main>
        <section class="text-gray-600 body-font  border-red-100 mx-auto w-2/3 relative border-4 h-72 mt-32">
            <h2 class="text-gray-600 body-font text-xl font-bold w-100 h-20 flex items-center justify-center">離乳食レシピ検索</h2>
            <div class="absolute container px-5 pt-6 mx-auto items-center justify-center flex" style="z-index: 3;">
                
                <div class="flex" >
                    <CategoryAges :categoryAges="categoryAges"   @categoryAgeSelected="handleCategoryAgeSelected"  />
                    <CategoryFoods :categoryFoods="categoryFoods" @categoryFoodSelected="handleCategoryFoodSelected" />
                </div>
            </div>
            <button 
                @click="searchCategoryRecipes"
                class="absolute bottom-0 text-white bg-pink-500 border-0 py-2 w-24 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                検索する
            </button>
        </section>
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

onMounted(async () => {
    await fetchAllCategoryAges()
    await fetchAllCategoryFoods()
});

// router.push({ name: 'new_manual', params: { recipeId: recipe.id } });
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