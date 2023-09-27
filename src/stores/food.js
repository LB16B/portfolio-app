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

        // 食品を更新するアクション
    const handleUpdatedFood = async (food) => {
        console.log("変更しました");
        try {
            const { data: updatedFood } = await updateFood(food.id, {
                ingredient: food.ingredient,
                amount: food.amount,
            });

            // 更新後のデータを反映
            const index = foods.value.findIndex(item => item.id === food.id);
            if (index !== -1) {
                foods.value[index].ingredient = updatedFood.data.ingredient;
                foods.value[index].amount = updatedFood.data.amount;
            }
        } catch (error) {
            console.error("API リクエストエラー:", error);
        }
    }


    return {
        foods,
        fetchAllFoods,
        handleAddedFood,
        handleUpdatedFood
    };
});