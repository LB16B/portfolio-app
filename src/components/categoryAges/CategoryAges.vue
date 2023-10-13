<template>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
      <CategoryAge
        v-for="category in categoryAges"
        :category="category"
        :key="category.id"
      />
    </div>
  </div>
</section>
</template>

<script setup>
import { useCategoryAgeStore} from '../../stores/categoryage';
import CategoryAge from '../categoryAges/CategoryAge.vue';

const categoryStore = useCategoryAgeStore()



defineProps({
  categoryAges: Array,
})
</script>