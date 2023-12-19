<template>
    <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap  mx-auto xl:pl-24">
                <Recipe v-for="recipe in paginatedRecipes" 
                    :recipe="recipe" 
                    :key="recipe.id" 
                    @updated="handleUpdatedRecipe" 
                    @removed="handleRemovedRecipe"
                    class=""
                />
            </div>
            <nav class="pagination flex justify-center pb-8 mt-20">
                <ul>
                    <li v-if="currentPage > 1">
                        <a @click="paginate(currentPage - 1)">前へ</a>
                    </li>
                    <li v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                        <a @click="paginate(page)">{{ page }}</a>
                    </li>
                    <li v-if="currentPage < totalPages">
                        <a @click="paginate(currentPage + 1)">次へ</a>
                    </li>
                </ul>
            </nav>
        </div>

    </section>
</template>

<script setup>
import { useRecipeStore } from "../../stores/recipe";
import Recipe from "./Recipe.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';

const router = useRouter
const store = useRecipeStore()
const { handleUpdatedRecipe, handleRemovedRecipe } = store

const props = defineProps({
    recipes: Array,
    show: {
        type: Boolean,
        default: true
    }
})

const currentPage = ref(1); // 現在のページ番号
const itemsPerPage = 11; // 1ページに表示するアイテム数

const paginatedRecipes = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return props.recipes.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    return Math.ceil(props.recipes.length / itemsPerPage);
});

const paginate = (page) => {
    currentPage.value = page;
};
</script>

<style>
/* ページネーションスタイルをカスタマイズすることができます */
.pagination {
  text-align: center;
}

.pagination ul {
  list-style: none;
  padding: 0;
}

.pagination li {
  display: inline-block;
  margin: 0 5px;
}

.pagination a {
  text-decoration: none;
  padding: 5px 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  color: #333;
}

.pagination a:hover {
  background-color: #333;
  color: #fff;
}

.pagination .active a {
  background-color: #333;
  color: #fff;
}
</style>