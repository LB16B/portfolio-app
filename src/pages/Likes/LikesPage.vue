<template>
    <main>
<div class="flex">
    <span class="title-font font-medium  text-gray-900">ブックマーク数：<TotalLike />件</span>
    <LikeActions />
</div>


    </main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLikeStore } from "../../stores/like";
import TotalLike from '../../components/likes/TotalLike.vue'
import LikeActions from '../../components/likes/LikeActions.vue'
import api from "../../http/api";

const store = useLikeStore()
const { likes } = storeToRefs(store)
const { fetchAllLikes } = store

onMounted(async () => {
    await fetchAllLikes()
});
</script>