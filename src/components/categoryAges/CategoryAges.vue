<template>


    <div class="relative  w-80">
      <div class="">
        <button
          v-if="selectedMenuItem === null"
          @click="toggleMenu" class="bg-pink-200 font-bold  p-2 rounded-lg lg:w-72 md:w-48  xl:w-80">
          月齢を選ぶ
        </button>
        <button
          v-else
          @click="toggleMenu" class="bg-pink-200 font-bold  p-2 rounded-lg lg:w-72  xl:w-60">
          {{ selectedMenuItem.stage }}
        </button>
      </div>


        <div 
          v-if="isMenuOpen" 
          class=" bg-white z-50 border-2  p-4 text-center  rounded-lg shadow-md lg:w-72  md:w-48  xl:w-80"
          @mouseenter="changeCursor('pointer')"
          @mouseleave="changeCursor('auto')"
          
          >
          <div
          v-for="category in categoryAges"
          :category="category"
          :key="category.id" 
          class="z-50 border-b-2 mb-2"
          >
        <p
          @click="selectMenuItem(category)"
          class="text-lg text-gray-900 font-medium title-font mb-2">{{ category.stage }}
        </p>
      </div>
      </div>
  </div>



</template>

<script setup>
import { useCategoryAgeStore} from '../../stores/categoryage';
import CategoryAge from '../categoryAges/CategoryAge.vue';
import { ref, computed} from "vue";


const emits = defineEmits(["categoryAgeSelected"]);
const categoryStore = useCategoryAgeStore()

defineProps({
  categoryAges: Array,
})

const isMenuOpen = ref(false);
const selectedMenuItem = ref(null); 

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  
}

const selectMenuItem = (category) => {
  selectedMenuItem.value = category;
  isMenuOpen.value = false
  emits("categoryAgeSelected", selectedMenuItem.value);
};



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
