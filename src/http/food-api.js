import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/foods";

export const allFoods = () => api.get(resource);

// export const createFood = (food) => api.post(resource, food);
export const createFood = async(food) => {

    try {
        const response = await api.post(resource, food);

        const recipeId = response.data.recipe_id;
        console.log('recipe_idの値:', recipeId);
    } catch (error) {
        console.log('エラー:', error)
    }
};