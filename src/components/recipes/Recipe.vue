<template>
    <div class="lg:w-72 lg:m-3 md:m-1  sm:w-52 lg:p-4  bg-red-50 rounded-md ">
        <router-link :to="{ name: 'show_recipe', params: { recipeId: recipe.id } }">
            <a class="block relative h-44 rounded overflow-hidden">
                <img 
                    alt="recipe image" 
                    class="object-cover object-center w-full h-full block" 
                    :src="getImagePath(recipe.filename)"
                >
            </a>
            <div class="mt-4">
                <span>{{ categoryFood }}</span>
                <h3 class="text-gray-900  text-xl ">{{ recipe.title }}</h3>
                <div class="flex ">
                    <div  class="flex  items-end text-black ">
                        <img class="w-4 mr-2 mb-1" src="../../../public/time.png">
                        <p class="mt-1 mr-3">&nbsp;約{{ recipe.time }}分</p>
                    </div>
                    <div  class="flex w-1/2  items-end text-black">
                        <img class="w-4 mr-1 items-end mb-1" src="../../../public/money.png">
                        <span class="mt-1 mr-3">&nbsp;約{{ recipe.price }}円</span>
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



