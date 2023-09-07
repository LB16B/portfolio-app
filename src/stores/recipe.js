import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allRecipes, createRecipe, updateRecipe, removeRecipe, showRecipe } from "../http/recipe-api";

export const useRecipeStore = defineStore('recipeStore', () => {
    const recipes = ref([]);

    const fetchAllRecipes = async () => {
        const { data } = await allRecipes();
        recipes.value = data.data;
    };

    const fetchRecipe = async (recipeId) => {
        const { data } = await showRecipe(recipeId);
        recipes.value = data.data;
    };
    // // recipes.valueに特定のレシピを追加または更新
    // const index = recipes.value.findIndex(item => item.id === recipe.id);
    // if (index !== -1) {
    //     // レシピが既に存在する場合、更新
    //     recipes.value[index] = recipe;
    // } else {
    //     // レシピが存在しない場合、新規追加
    //     recipes.value.unshift(recipe);
    // }


    const handleAddedRecipe = async (newRecipe) => {
        const { data: createdRecipe } = await createRecipe(newRecipe);
        recipes.value.unshift(createdRecipe.data);
    };

    const handleUpdatedRecipe = async (recipe) => {
        const { data: updatedRecipe } = await updateRecipe(recipe.id, {
            title: recipe.title,
            time: recipe.time,
            price: recipe.price,
            filename: recipe.filename
        })
        const currentRecipe = recipes.value.find(item => item.id === recipe.id)
        currentRecipe.title = updatedRecipe.data.title
        currentRecipe.time = updatedRecipe.data.time
        currentRecipe.price = updatedRecipe.data.price
        currentRecipe.filename = updatedRecipe.data.filename
    }
    
    const handleRemovedRecipe = async (recipe) => {
        await removeRecipe(recipe.id)
        const index = recipes.value.findIndex(item => item.id === recipe.id )
        recipes.value.splice(index, 1)
    }


    // const totalRecipes = computed(() => 
    // state.recipes.length
    // );

    return {
        recipes,
        fetchAllRecipes,
        fetchRecipe,
        // totalRecipes,
        handleAddedRecipe,
        handleUpdatedRecipe,
        handleRemovedRecipe
    };
});