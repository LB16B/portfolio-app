<template>
  <span class="title-font font-medium  text-gray-900">ブックマーク数：{{ likesCount }}件</span>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLikeStore } from "../../stores/like";

const likeStore = useLikeStore();
const likesCount = computed(() => likeStore.likesCount);

</script>
