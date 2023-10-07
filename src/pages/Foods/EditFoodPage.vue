<template>
    <main>
        <EditFoods :foods="filteredFood" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from 'vue-router';
import { useFoodStore } from "../../stores/food";
import Foods from '../../components/foods/Foods.vue';
import EditFoods from '../../components/foods/EditFoods.vue'
import api from "../../http/api";

// food
const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const { fetchAllFoods } = foodStore

onMounted(async () => {
    await fetchAllFoods()
});

// パラメーター
const route = useRoute();
let urlParameterRecipeId = null;

onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});

const filteredFood = computed(() => {
    return foods.value.filter(food => food.recipe_id === Number(urlParameterRecipeId));
});




</script>
