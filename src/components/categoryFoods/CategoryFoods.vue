<template>


    <div class="relative w-80 ">
      <div class="">
        <button 
          v-if="selectedMenuItem === null"
          @click="toggleMenu" 
          class="bg-pink-200 font-bold  p-2 rounded-lg lg:w-72 md:w-48   xl:w-80">
          食材カテゴリを選ぶ
        </button>
        <button
          v-else
          @click="toggleMenu" class="bg-pink-200 font-bold  p-2 rounded-lg lg:w-72  xl:w-60">
          {{ selectedMenuItem.name }}
        </button>
      </div>


      <div 
        v-if="isMenuOpen" 
        class="absolute top-10 mx-auto bg-white z-0  border-2 mr-10 p-4 text-center  rounded-lg shadow-md lg:w-72  xl:w-60"
        @mouseenter="changeCursor('pointer')"
        @mouseleave="changeCursor('auto')"
        >
        <div
        v-for="categoryFood in categoryFoods"
        :categoryFood="categoryFood"
        :key="categoryFood.id"
      >
      <p
        @click="selectMenuItem(categoryFood)"
        class="text-lg text-gray-900 font-medium title-font mb-2">{{ categoryFood.name }}
      </p>
    </div>
    </div>
  </div>


</template>

<script setup>
import { useCategoryFoodStore } from '../../stores/category-food';
import CategoryFood from '../categoryFoods/CategoryFood.vue';
import { ref, computed } from "vue";

const emits = defineEmits(["categoryFoodSelected"]);
const categoryFoodStore = useCategoryFoodStore()

defineProps({
  categoryFoods: Array,
})

const isMenuOpen = ref(false);
const selectedMenuItem = ref(null); 

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

const selectMenuItem = (categoryFood) => {
  selectedMenuItem.value = categoryFood;
  isMenuOpen.value = false
  emits("categoryFoodSelected", selectedMenuItem.value);
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