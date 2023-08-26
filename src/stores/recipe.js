import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allRecipes } from "../http/recipe-api";

const tmp = {
    state: () => ({}),
    getters: {},
    actions: {},
};

export const useRecipeStore = defineStore('recipeStore', () => {
    const recipes = ref([]);

    const totalRecipes = computed(() => 
        state.recipes.length
    );

    // 特定に価格以下
    // const recipesBelowPrice = computed((maxPrice) => 
    // state.recipes.filter(recipe => recipe.price <= maxPrice)
    // );

    // 特定のID
    // const getRecipeById = computed((id) => 
    // state.recipes.find(recipe => recipe.id === id)
    // );

    const fetchAllRecipes = async () => {
        const { data } = await allRecipes();
        recipes.value = data.data;
    };

    return {
        recipes,
        totalRecipes,
        fetchAllRecipes,
    };
});