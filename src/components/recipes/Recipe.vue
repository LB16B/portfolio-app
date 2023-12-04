<template>
    <div class="xl:w-72 border-2 flex justify-start lg:w-64  lg:m-3 md:m-1  sm:w-52 lg:p-4 md:p-4  bg-red-50 rounded-md ">
        <router-link :to="{ name: 'show_recipe', params: { recipeId: recipe.id } }">
            <a class="block relative h-44 rounded overflow-hidden">
                <img 
                    alt="recipe image" 
                    class="lg:object-cover lg:object-center lg:w-full lg:h-full lg:block w-44 h-44 flex" 
                    :src="getImagePath(recipe.filename)"
                >
            </a>
            <div class="mt-4">
                <span>{{ categoryFood }}</span>
                <h3 class="text-gray-900  lg:text-xl ">{{ recipe.title }}</h3>
                <div class="flex md:text-sm">
                    <div  class="flex  items-end text-black md:mr-2">
                        <img class="lg:w-4 lg:mr-2 lg:mb-1 md:w-4" src="../../../public/time.png">
                        <p class="lg:mt-1 lg:mr-3 md:text-sm md:mt-2">&nbsp;約{{ recipe.time }}分</p>
                    </div>
                    <div  class="flex w-1/2  items-end text-black">
                        <img class="lg:w-4 lg:mr-1 items-end lg:mb-1 md:w-4" src="../../../public/money.png">
                        <span class="lg:mt-1 lg:mr-3 md:text-sm md:mt-2">&nbsp;約{{ recipe.price }}円</span>
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
    categoryFood.value = categoryFoods.value[route.params.foodId -1]
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



