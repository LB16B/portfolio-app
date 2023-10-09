<template>
  <span class="title-font font-medium  text-gray-900">ブックマーク数：{{ likesCount }}件</span>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useLikeStore } from "../../stores/like";
  
  const likeStore = useLikeStore();
  const likesCount = computed(() => likeStore.likesCount);
  </script>
  
  <!-- <template>
    <span class="title-font font-medium text-gray-900">ブックマーク数：{{ filteredLikesCount }}件</span>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useLikeStore } from "../../stores/like";
  
  const likeStore = useLikeStore();
  
  // 特定のrecipe_idに一致するlikeの数をカウントするcomputedプロパティを追加
  const targetRecipeId = 3; // 目標のrecipe_idを設定
  const filteredLikesCount = computed(() => {
    return likeStore.likesCount.filter(like => like.recipe_id === targetRecipeId).length;
  });
  </script> -->