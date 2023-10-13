import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allCategoryFoods } from "../http/category-food-api";

export const useCategoryFoodStore = defineStore('categoryFoodStore', () => {
    const categoryFoods = ref([]);

    const fetchAllCategoryFoods = async () => {
        const { data } = await allCategoryFoods();
        categoryFoods.value = data.data;
    }

    return {
        categoryFoods,
        fetchAllCategoryFoods,
    };
});