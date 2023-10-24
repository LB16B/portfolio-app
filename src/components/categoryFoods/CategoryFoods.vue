<template>


    <div class="relative border-2 w-80">
      <button @click="toggleMenu" class="bg-blue-500 text-white p-2 rounded-lg">ボトムダウンをトグル</button>
      <div 
        v-if="isMenuOpen" 
        class="absolute right-0 bottom-0 bg-white p-4 w-48 rounded-lg shadow-md"
        @mouseenter="changeCursor('pointer')"
        @mouseleave="changeCursor('auto')"
        >
        <CategoryFood
        v-for="categoryFood in categoryFoods"
        :categoryFood="categoryFood"
        :key="categoryFood.id"
        @categoryFoodSelected="handleCategorySelected"
      />
    </div>
  </div>
  <p>選択されたカテゴリ: {{ selectedMenuItem }}</p>


</template>

<script setup>
import { useCategoryFoodStore } from '../../stores/category-food';
import CategoryFood from '../categoryFoods/CategoryFood.vue';
import { ref, computed } from "vue";

const categoryFoodStore = useCategoryFoodStore()

defineProps({
  categoryFoods: Array,
})

const isMenuOpen = ref(false);
const selectedMenuItem = ref(null); 

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

const selectMenuItem = (item) => {
  selectedMenuItem.value = item;
}

const handleCategorySelected = (selectedCategory) => {
  selectedMenuItem.value = selectedCategory;
  console.log('カテゴリー食べ物', selectedMenuItem.value)
}

const changeCursor = (cursorStyle) => {
  document.body.style.cursor = cursorStyle;
}
</script>

<style scoped>
.menu {
  cursor: auto;
}
.menu.open-menu {
  cursor: pointer;
}
</style>