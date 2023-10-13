<template>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      <CategoryFood
        v-for="categoryFood in categoryFoods"
        :categoryFood="categoryFood"
        :key="categoryFood.id"
      />
    </div>
  </div>
</section>
</template>

<script setup>
import { useCategoryFoodStore } from '../../stores/category-food';
import CategoryFood from '../categoryFoods/CategoryFood.vue';

const categoryFoodStore = useCategoryFoodStore()



defineProps({
  categoryFoods: Array,
})
</script>