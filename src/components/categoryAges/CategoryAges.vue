<template>


    <div class="relative w-80">
      <div class="">
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
          class=" bg-white border-2 mr-10 p-4 text-center  rounded-lg shadow-md w-60"
          @mouseenter="changeCursor('pointer')"
          @mouseleave="changeCursor('auto')"
          style="z-index: 999;"
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
  console.log('カテゴリー月齢', selectedMenuItem.value.id)
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
