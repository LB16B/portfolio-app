<template>
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full bg-red-50 rounded-md">
        <router-link :to="{ name: 'show_recipe', params: { recipeId: recipe.id } }">
            <a class="block relative h-48 rounded overflow-hidden">
                <img 
                    alt="recipe image" 
                    class="object-cover object-center w-full h-full block" 
                    :src="getImagePath(recipe.filename)"
                >
            </a>
            <div class="mt-4">
                <span>{{ categoryFood }}</span>
                <h2 class="text-gray-900 title-font text-xl font-medium">{{ recipe.title }}</h2>
                <div class="flex  items-center">
                    <div  class="flex w-1/2  items-center ">
                        <img class="w-5 mr-2" src="../../../public/time.png">
                        <span class="mt-1 mr-1 text-l">約{{ recipe.time }}分</span>
                    </div>
                    <div  class="flex w-1/2  items-center  text-base">
                        <img class="w-5 mr-1" src="../../../public/money.png">
                        <span class="mt-1 mr-3">約{{ recipe.price }}円</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import RecipeActions from './RecipeActions.vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryFoodStore } from "../../stores/category-food";
import CategoryFoods from "../../components/categoryFoods/CategoryFoods.vue";
import api from "../../http/api";

const route = useRoute();
const categoryFoodStore = useCategoryFoodStore()
const { categoryFoods } = storeToRefs(categoryFoodStore)
const { fetchAllCategoryFoods } = categoryFoodStore
const categoryFood = ref('')

onMounted(async () => {
    await fetchAllCategoryFoods()
    categoryFood.value = categoryFoods.value[route.params.foodId -1].name
});




const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
    return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})


</script>



