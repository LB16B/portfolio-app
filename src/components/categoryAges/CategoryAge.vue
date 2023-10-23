<template>
    <p
        @click="selectMenuItem(category.stage)"
        class="text-lg text-gray-900 font-medium title-font mb-2">{{ category.stage }}
    </p>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryAgeStore } from "../../stores/categoryage";

const path = "http://localhost:8000/icons/";

function getImagePath(filename) {
    return path + filename;
}


const props = defineProps({
    category: Object,
})

const emits = defineEmits(["categorySelected"]);

const selectMenuItem = (selectedCategory) => {
  // カスタムイベントを発生させて選択されたカテゴリを親コンポーネントに送信
    emits("categorySelected", selectedCategory);
};
</script>