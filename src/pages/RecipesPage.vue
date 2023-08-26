<template>
    <main>
        <div>
            <div>
                <div>
                    <NewRecipe @added="handleAddedRecipe" />
                    <!-- List of Recipes -->
                    <p>合計レシピ数 :  {{ totalRecipeCount }} 件</p>
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
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../stores/recipe";
import { allRecipes, createRecipe, removeRecipe, updateRecipe } from "../http/recipe-api";
import Recipes from '../components/recipes/Recipes.vue';
import NewRecipe from "../components/recipes/NewRecipe.vue";

const store = useRecipeStore()
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store
const totalRecipeCount = computed(() => store.totalRecipes);

// const recipes = ref([])

onMounted(async() => {
    console.log("Fetching recipes...");
    await fetchAllRecipes();
    console.log("Fetched recipes:", recipes.value);
    console.log(recipes.value[1].title);

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
