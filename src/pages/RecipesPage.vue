<template>
    <main>
        <div>
            <div>
                <div>
                    <NewRecipe @added="handleAddedRecipe" />
                    <!-- List of Recipes -->
                    <Recipes :recipes="recipes" 
                        @updated="handleUpdatedRecipe"
                        @removed="handleRemovedRecipe"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { allRecipes, createRecipe, removeRecipe, updateRecipe } from "../http/recipe-api";
import Recipes from '../components/recipes/Recipes.vue';
import NewRecipe from "../components/recipes/NewRecipe.vue";

const recipes = ref([]);

onMounted(async() => {
    const { data } = await allRecipes();
    recipes.value = data.data;
});

const handleAddedRecipe = async (newRecipe) => {
    const { data: createdRecipe } = await createRecipe(newRecipe);
    recipes.value.unshift(createdRecipe.data);
}

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
</script>
