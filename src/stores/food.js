import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allFoods, createFood, updateFood } from "../http/food-api";

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

            console.log('成功')
        } catch (error) {
            console.error("API リクエストエラー:", error);
        }
    };

    const handleUpdateFood = async (food) => {
        const { data: updatedFood } = await updateFood(food.id, {
            ingredient: food.ingredient,
            amount: food.amount,
            recipe_id: food.recipe_id
        })
        const currentFood = foods.value.find(item => item.id === food.recipe_id)
        currentFood.ingredient = updatedFood.data.ingredient
        currentFood.amount = updatedFood.data.amount
        currentFood.recipe_id = updatedFood.data.recipe_id
    }

    return {
        foods,
        fetchAllFoods,
        handleAddedFood,
        handleUpdateFood
    };
});