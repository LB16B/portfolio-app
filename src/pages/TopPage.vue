
<template>
    <main>
        <section class="text-gray-600 body-font">
            <div class="container px-5 pt-24 mx-auto">
                <CategoryAges :categoryAges="categoryAges" />
                <CategoryFoods :categoryFoods="categoryFoods" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia"
import { useCategoryAgeStore } from "../stores/categoryage";
import { useCategoryFoodStore } from "../stores/category-food";
import CategoryAges from "../components/categoryAges/CategoryAges.vue";
import CategoryFoods from "../components/categoryFoods/CategoryFoods.vue";
import api from "../http/api";

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