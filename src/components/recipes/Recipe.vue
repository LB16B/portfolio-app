<template>
    <div class="xl:w-72   flex justify-start lg:w-64 m-2  sm:w-52 lg:p-4 md:p-4  bg-red-50 rounded-md ">
        <div v-if="hasLikes">
            <div
            @click="handleDelete"
                class="bg-pink-500 w-8 h-8 flex items-center rounded-full mb-2"
            >
                <img src="../../assets/images/delete.png" class="w-2/3 h-2/3 mx-auto ">
            </div>
        </div>
        <router-link :to="{ name: 'show_recipe', params: { recipeId: recipe.id } }">
            <div>

              </div>
            <a class="block relative h-44 rounded overflow-hidden">
                <img 
                    alt="recipe image" 
                    class="lg:object-cover lg:object-center lg:w-full lg:h-full lg:block w-44 h-44 flex" 
                    :src="getImagePath(recipe.filename)"
                >
            </a>
            <div class="mt-4">
                <p class="text-sm">{{ categoryFood.name }}</p>
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
                <p class="text-sm">{{ categoryAge.stage }}</p>

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
import { useCategoryAgeStore } from "../../stores/categoryage";
import CategoryFoods from "../../components/categoryFoods/CategoryFoods.vue";
import api from "../../http/api";

const route = useRoute();
const categoryFoodStore = useCategoryFoodStore()
const categoryAgeStore = useCategoryAgeStore()
const { categoryFoods } = storeToRefs(categoryFoodStore)
const { categoryAges } = storeToRefs(categoryAgeStore)
const { fetchAllCategoryFoods } = categoryFoodStore
const { fetchAllCategoryAges } = categoryAgeStore
import { useLikeStore } from "../../stores/like";
const categoryFood = ref('')
const categoryAge = ref('')

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
    return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

const likeStore = useLikeStore();

onMounted(async () => {
    await fetchAllCategoryFoods()
    await fetchAllCategoryAges()
    categoryFood.value =  categoryFoods.value[props.recipe.category_food_id]
    categoryAge.value = categoryAges.value[props.recipe.category_age_id]

});

// const hasLikes = 'likes' in route.query;
// もしくは以下のようにも書くことができます：
const hasLikes = route.path.includes('likes');

// デバッグ用にコンソールに出力する場合
if (hasLikes) {
    console.log('URLに likes が含まれています！');
}

const handleDelete = async () => {
    try {
        // このrecipeに対応するlikeを検索
        const targetLike = likeStore.likes.find(like => like.recipe_id === props.recipe.id);
        
        if (targetLike) {
            // 対応するlikeが見つかった場合は削除
            await likeStore.handleRemovedLike(targetLike);
        } else {
            console.warn('該当するlikeが見つかりませんでした');
        }
    } catch (error) {
        console.error('likeの削除中にエラーが発生しました', error);
    }
}
</script>



