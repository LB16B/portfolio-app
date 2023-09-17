import { defineStore } from "pinia";
import { allFoods } from "../http/food-api";
import { ref } from "vue";

export const useFoodStore = defineStore('foodStore', () => {
    const foods = ref([]);

    const fetchAllFoods = async () => {
        const { data } = await allFoods();
        foods.value = data.data;
    }

    return {
        foods,
        fetchAllFoods
    };
});