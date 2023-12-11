<template>
    <div class="p-4 w-full border-b-4 flex">
        <a class="block relative w-1/3  rounded overflow-hidden 0">
            <img 
            alt="recipe image" 
            class="object-cover object-center w-2/3 block" 
            :src="getImagePath(recipe.filename)"
            >
        </a>
        <div class="mt-4 w-1/2">
            <h2 class="text-gray-900 title-font text-xl font-medium">{{ recipe.title }}</h2>
            <div class="flex">
                <router-link :to="{ name: 'edit_recipe', params: { recipeId: recipe.id } }">
                    <div class="bg-pink-500 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center">
                        <img src="../../assets//images/edit.png" class="mx-auto  w-6">
                    </div>
                </router-link>
                <div 
                    @click="handleDelete"
                    class="bg-pink-500 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center ml-4"
                >
                    <img src="../../assets/images/delete.png" class="mx-auto  w-6">
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script setup>
import { ref, computed } from "vue";
import { useRecipeStore } from "../../stores/recipe";
import RecipeActions from './RecipeActions.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useRecipeStore();

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
    return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

const handleDelete = () => {
    store.handleRemovedRecipe(props.recipe);
    // オプション：削除後に特定のページにリダイレクトする場合
    // router.push({ name: 'desired_route_name' });
    console.log('削除成功')
};

</script>



