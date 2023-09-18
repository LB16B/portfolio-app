<template>
    <main>
        <ShowRecipe :recipes="filteredRecipeId" />
        <Food :foods="selectedFood" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe"
import { useFoodStore } from "../../stores/food";
import { useRoute, useRouter } from 'vue-router';;
import Recipes from '../../components/recipes/Recipes.vue';
import ShowRecipe from '../../components/recipes/ShowRecipe.vue';
import Food from '../../components/foods/Food.vue';
import api from "../../http/api";


const recipeStore = useRecipeStore()
const foodStore = useFoodStore()
const { recipes } = storeToRefs(recipeStore)
const { foods } = storeToRefs(foodStore)
const { fetchAllRecipes } = recipeStore
const { fetchAllFoods } = foodStore
const upload = ref([])

onMounted(async () => {
    await fetchAllRecipes()
    await fetchAllFoods()
});

const route = useRoute();
let urlParameterRecipeId = null;

// URL パラメーターの取得はコンポーネントがマウントされた後に行う
onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});
const filteredRecipeId = computed(() => {
    return recipes.value.filter(recipe => recipe.id === Number(urlParameterRecipeId));
});

// const selectedFood = computed(() => {
//     return foods.value.filter(food => food.recipe_id === Number(urlParameterRecipeId));
// });

const selectedFood = computed(() => {
    const selected = foods.value.filter(food => food.recipe_id === Number(urlParameterRecipeId));
    console.log(selected); // selected の内容をコンソールに表示
    return selected;
});



</script>
