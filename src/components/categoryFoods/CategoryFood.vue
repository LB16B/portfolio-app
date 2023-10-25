<template>
    <p
        @click="selectMenuItem"
        class="text-lg text-gray-900 font-medium title-font mb-2">{{ categoryFood.name }}
    </p>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCategoryFoodStore } from "../../stores/category-food";

const { categoryFood } = defineProps(["categoryFood"]);

const emits = defineEmits(["categoryFoodSelected"]);

const selectMenuItem = () => {
    emits("categoryFoodSelected", categoryFood);
};
</script>