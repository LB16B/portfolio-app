<template>
  <!-- <span class="title-font font-medium  text-gray-900">ブックマーク数：{{ likesCount }}件</span> -->
</template>

<script setup>
import { ref, computed, watch, watchEffect} from "vue";
import { useLikeStore } from "../../stores/like";

const likeStore = useLikeStore();
// const likesCount = computed(() => likeStore.likesCount);

watchEffect(() => {
  // console.log('いいねの総数', likeStore.likesCount);
  // likeStore.likesCountの更新された値を使って何か処理を行います
});

// likesを直接監視することもできます
watchEffect(() => {
  // console.log('いいねの配列が変わりました:', likeStore.likes);
  // 更新されたいいねの配列を使って何か処理を行います
});
</script>
