<template>
    <main>
<div class="flex">
    <TotalLike />
    <LikeActions :likes="likes" />
</div>


</main>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLikeStore } from "../../stores/like";
import { useRoute, useRouter } from 'vue-router';
import TotalLike from '../../components/likes/TotalLike.vue'
import LikeActions from '../../components/likes/LikeActions.vue'
import api from "../../http/api";

const route = useRoute()
const store = useLikeStore()
const { likes } = storeToRefs(store)
const { fetchAllLikes } = store

// パラ―メータ取得
let urlParameterRecipeId = route.params.recipeId;
// console.log(urlParameterRecipeId)


onMounted(async () => {
    await fetchAllLikes()
});

</script>