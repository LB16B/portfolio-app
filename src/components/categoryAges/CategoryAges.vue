<template>


    <div class="relative w-80">
      <div class="mb-8">
        <button
          v-if="selectedMenuItem === null"
          @click="toggleMenu" class="bg-blue-500 text-white p-2 rounded-lg  w-60">
          月齢を選ぶ
        </button>
        <button
          v-else
          @click="toggleMenu" class="bg-blue-500 text-white p-2 rounded-lg w-60">
          {{ selectedMenuItem.stage }}
        </button>
      </div>

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
  isMenuOpen.value = false
  console.log('カテゴリー月齢', selectedMenuItem)
}

console.log(selectedMenuItem)

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
