<template>
    <p
        @click="selectMenuItem"
        class="text-lg text-gray-900 font-medium title-font mb-2">{{ category.stage }}
    </p>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { useCategoryAgeStore } from "../../stores/categoryage";

// const path = "http://localhost:8000/icons/";

// function getImagePath(filename) {
//     return path + filename;
// }


// const props = defineProps({
//     category: Object,
// })

const { category } = defineProps(["category"]);

const emits = defineEmits(["categoryAgeSelected"]);

const selectMenuItem = () => {
  emits("categoryAgeSelected", category);
};
</script>