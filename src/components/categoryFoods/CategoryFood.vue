<template>
    <div class="xl:w-1/3 md:w-1/2 p-4">
        <router-link :to="{ name: 'category_food_recipes', params: { categoryFoodId: categoryFood.id } }">
            <div class="border border-gray-200 p-6 rounded-lg">
            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
            >
                <img 
                    :src="getImagePath(categoryFood.filename)"
                    alt="年齢別カテゴリーのアイコン"
                    class="rounded-full"
                >
            </div>
            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">{{ categoryFood.name }}</h2>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryFoodStore } from "../../stores/category-food";

const path = "http://localhost:8000/icons/";

function getImagePath(filename) {
    return path + filename;
}


const props = defineProps({
    categoryFood: Object,
})

</script>