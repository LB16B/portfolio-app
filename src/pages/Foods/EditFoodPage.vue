<template>
    <main>
        <EditFoods
            :foods="filteredRecipeId"
            @updated="handleUpdatedFood"
        />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe"
import { useRoute, useRouter } from 'vue-router';
import Foods from '../../components/foods/Foods.vue'
import { useFoodStore } from '../../stores/food'
import EditFoods from '../../components/foods/EditFoods.vue'
import api from "../../http/api";

const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const { fetchAllFoods, handleUpdatedFood } = foodStore


onMounted(async () => {
    await fetchAllFoods()
});

const route = useRoute();
let urlParameterRecipeId = null;

onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});


const filteredRecipeId = computed(() => {
    return foods.value.filter(food => food.recipe_id === Number(urlParameterRecipeId));
});
</script>