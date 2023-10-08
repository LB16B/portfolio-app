<template>
    {{ likesCount }}
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useLikeStore } from "../../stores/like";
  
  const likeStore = useLikeStore();
  const likesCount = computed(() => likeStore.likesCount);
  </script>
  