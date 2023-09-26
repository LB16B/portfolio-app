<template>
    <main>
        <EditFoods :foods="filteredRecipeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useFoodStore } from "../../stores/food"
import { useRoute, useRouter } from 'vue-router';
import Foods from '../../components/foods/Foods.vue';
import EditFoods from '../../components/foods/EditFoods.vue'
import api from "../../http/api";

const store = useFoodStore()
const { foods } = storeToRefs(store)
const { fetchAllFoods } = store

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
