<template>
    <main>
        <CategoryAges :categoryAges="categoryAges" />
        <CategoryFoods :categoryFoods="categoryFoods" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useCategoryAgeStore } from "../../stores/categoryage";
import { useCategoryFoodStore } from "../../stores/category-food";
import CategoryAges from "../../components/categoryAges/CategoryAges.vue";
import CategoryFoods from "../../components/categoryFoods/CategoryFoods.vue";
import api from "../../http/api";

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


</script>