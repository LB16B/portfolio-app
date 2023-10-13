import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allCategoryAges } from "../http/categoryage-api";

export const useCategoryAgeStore = defineStore('categoryStore', () => {
    const categoryAges = ref([]);

    const fetchAllCategoryAges = async () => {
        const { data } = await allCategoryAges();
        categoryAges.value = data.data;
    }

    return {
        categoryAges,
        fetchAllCategoryAges,
    };
});