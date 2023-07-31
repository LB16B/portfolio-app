<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Recipe -->
                    <NewRecipe @added="handleAddedRecipe" />
                    <!-- List of Recipes -->
                    <Recipes :recipes="recipes" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { allRecipes, createRecipe } from "../http/recipe-api";
import Recipes from '../components/recipes/Recipes.vue';
import NewRecipe from "../components/recipes/NewRecipe.vue";

const recipes = ref([]);

onMounted(async() => {
    const { data } = await allRecipes();
    recipes.value = data.data;
});

const handleAddedRecipe = async (newRecipe) => {
    console.log(newRecipe); // 新しいレシピデータを表示
    const { data: createdRecipe } = await createRecipe(newRecipe);
    recipes.value.unshift(createdRecipe.data);
}
</script>
