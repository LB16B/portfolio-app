import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allFoods, createFood, updateFood } from "../http/food-api";
import { useRouter } from 'vue-router';

export const useFoodStore = defineStore('foodStore', () => {
    const foods = ref([]);
    const router = useRouter();

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

        // データ更新
    const handleUpdatedFood = async (food) => {
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

            console.log("変更しました");
        } catch (error) {
            console.error("API リクエストエラー:", error);
        }
        router.push({ name: 'my_recipes' });
    }


    return {
        foods,
        fetchAllFoods,
        handleAddedFood,
        handleUpdatedFood
    };
});