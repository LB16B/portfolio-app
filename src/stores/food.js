import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allFoods, createFood } from "../http/food-api";

export const useFoodStore = defineStore('foodStore', () => {
    const foods = ref([]);

    const fetchAllFoods = async () => {
        const { data } = await allFoods();
        foods.value = data.data;
    }

    const handleAddedFood = async (newFood) => {
        try {
            const { data: createdFood } = await createFood(newFood);
            foods.value.unshift(createdFood.data);
        } catch (error) {
            console.error("API リクエストエラー:", error);
        }
    };

    return {
        foods,
        fetchAllFoods,
        handleAddedFood,
    };
});