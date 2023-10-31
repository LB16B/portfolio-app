<template>
    <main>
        <NewReview />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useReviewStore } from "../../stores/review";
import NewReview from "../../components/reviews/NewReview.vue";
import api from "../../http/api";

const store = useReviewStore()
const { reviews } = storeToRefs(store)
const { fetchAllReviews } = store

onMounted(async () => {
    await fetchAllReviews()
})
</script>