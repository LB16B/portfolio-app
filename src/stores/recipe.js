import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allRecipes, createRecipe, updateRecipe, removeRecipe } from "../http/recipe-api";
import { useRouter } from 'vue-router';

export const useRecipeStore = defineStore('recipeStore', () => {
    const recipes = ref([]);
    const router = useRouter();

    const fetchAllRecipes = async () => {
        const { data } = await allRecipes();
        recipes.value = data.data;
    };



    const handleAddedRecipe = async (newRecipe) => {
        const { data: createdRecipe } = await createRecipe(newRecipe);
        
        recipes.value.unshift(createdRecipe.data);

        console.log('新しいレシピの ID:', createdRecipe.recipe_id);
        router.push({ name: 'new_food', params: { recipe_id: createdRecipe.recipe_id } });
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

    return {
        recipes,
        fetchAllRecipes,
        handleAddedRecipe,
        handleUpdatedRecipe,
        handleRemovedRecipe
    };
});