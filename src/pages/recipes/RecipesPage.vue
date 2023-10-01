<template>
    <main>
        <Recipes :recipes="filteredCategoryAgeId" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import Recipes from '../../components/recipes/Recipes.vue';
import api from "../../http/api";

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)
const { fetchAllRecipes } = recipeStore

const upload = ref([])


onMounted(async () => {
    await fetchAllRecipes()
});

const route = useRoute();
let urlParameterCategoryAgeId = null;

onMounted(() => {
    urlParameterCategoryAgeId = route.params.categoryAgeId;
});

const filteredCategoryAgeId = computed(() => {
    return recipes.value.filter(recipe => recipe.category_age_id === Number(urlParameterCategoryAgeId))
})
console.log(filteredCategoryAgeId)

</script>
