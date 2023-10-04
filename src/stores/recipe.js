import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allRecipes, createRecipe, updateRecipe, removeRecipe } from "../http/recipe-api";
import { useRouter } from 'vue-router';
import { data } from "autoprefixer";

export const useRecipeStore = defineStore('recipeStore', () => {
    const recipes = ref([]);
    const router = useRouter();

    // データ全件取得
    const fetchAllRecipes = async () => {
        const { data } = await allRecipes();
        recipes.value = data.data;
    };


    // 新しいデータ作成
    const handleAddedRecipe = async (newRecipe) => {
        const { data: createdRecipe } = await createRecipe(newRecipe);
        recipes.value.unshift(createdRecipe.data);
        
        router.push({ name: 'new_food', params: { recipe_id: createdRecipe.recipe_id } });
    };

    // データ編集
    const handleUpdatedRecipe = async (recipe) => {
        const { data: updatedRecipe } = await updateRecipe(recipe.id, {
            title: recipe.title,
            time: recipe.time,
            price: recipe.price,
            category_age_id: recipe.category_age_id,
            filename: recipe.filename
        })
        const currentRecipe = recipes.value.find(item => item.id === recipe.id)
        currentRecipe.title = updatedRecipe.data.title
        currentRecipe.time = updatedRecipe.data.time
        currentRecipe.price = updatedRecipe.data.price
        currentRecipe.category_age_id = updatedRecipe.data.category_age_id
        currentRecipe.filename = updatedRecipe.data.filename

        // router.push({ name: 'edit_food', params: { recipeId: recipe.id } });
    }
    
    // データ削除
    const handleRemovedRecipe = async (recipe) => {
        await removeRecipe(recipe.id)
        const index = recipes.value.findIndex(item => item.id === recipe.id )
        recipes.value.splice(index, 1)
    }

    // 検索
    const searchQuery = ref('')
    const searchRecipes = async () => {
        const { sata } = await allRecipes({ query: searchQuery.value });
        recipes.value = data.data;

    }

    return {
        recipes,
        searchQuery,
        fetchAllRecipes,
        handleAddedRecipe,
        handleUpdatedRecipe,
        handleRemovedRecipe,
        searchRecipes
    };
});