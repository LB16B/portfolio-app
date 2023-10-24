<template>
    <p
        @click="selectMenuItem(categoryFood.id)"
        class="text-lg text-gray-900 font-medium title-font mb-2">{{ categoryFood.name }}
    </p>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryFoodStore } from "../../stores/category-food";

const path = "http://localhost:8000/icons/";

function getImagePath(filename) {
    return path + filename;
}


const props = defineProps({
    categoryFood: Object,
})

const emits = defineEmits(["categoryFoodSelected"]);

const selectMenuItem = (selectedCategory) => {
  // カスタムイベントを発生させて選択されたカテゴリを親コンポーネントに送信
    emits("categoryFoodSelected", selectedCategory);
};
</script>