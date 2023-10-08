<template>
    <main>
        <div class="flex">
            <span>ブックマーク数：</span><TotalLike /><span>件</span>
            <button class="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">ブックマーク</button>
        </div>
    </main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLikeStore } from "../../stores/like";
import TotalLike from "../../components/likes/TotalLike.vue";
import api from "../../http/api";

const store = useLikeStore()
const { likes } = storeToRefs(store)
const { fetchAllLikes } = store

onMounted(async () => {
    await fetchAllLikes()
});
</script>