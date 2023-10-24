<template>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">

    <div class="relative border-2 w-80">
      <button @click="toggleMenu" class="bg-blue-500 text-white p-2 rounded-lg">ボトムダウンをトグル</button>
      <div 
        v-if="isMenuOpen" 
        class="absolute right-0 bottom-0 bg-white p-4 w-48 rounded-lg shadow-md"
        @mouseenter="changeCursor('pointer')"
        @mouseleave="changeCursor('auto')"
        >
        <CategoryAge
        v-for="category in categoryAges"
        :category="category"
        :key="category.id"
        @categoryAgeSelected="handleCategorySelected"
      />
    </div>
  </div>
  <p>選択されたカテゴリ: {{ selectedMenuItem }}</p>

</div>

</section>

</template>

<script setup>
import { useCategoryAgeStore} from '../../stores/categoryage';
import CategoryAge from '../categoryAges/CategoryAge.vue';
import { ref, computed } from "vue";

const categoryStore = useCategoryAgeStore()

defineProps({
  categoryAges: Array,
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
  console.log('カテゴリー月齢', selectedMenuItem.value)
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
