<template>
    <main>
        <CategoryAges :categoryAges="categoryAges" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useCategoryAgeStore } from "../../stores/category";
import CategoryAges from "../../components/categoryAges/CategoryAges.vue";
import api from "../../http/api";

const categoryStore = useCategoryAgeStore()
const { categoryAges } = storeToRefs(categoryStore)
const { fetchAllCategoryAges } = categoryStore

onMounted(async () => {
    await fetchAllCategoryAges()
});
</script>