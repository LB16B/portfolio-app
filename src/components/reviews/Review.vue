<template>
    <div class="p-2  md:w-1/2 w-1/3 ">
        <div class="h-full flex items-center bg-white p-4 rounded-lg ">
            <img 
                alt="team" 
                class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" 
                :src="'http://localhost:8000/profile_images/' + matchingUser.filename"
            >
            <div class="flex-grow">
                <h2 class="text-gray-900 title-font font-medium">{{ matchingUser.name }}</h2>
                <p class=" text-yellow-400">{{ displayStars(review.score) }}</p>
                <p class="text-gray-500">{{ review.body }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useReviewStore } from "../../stores/review";
import { useRoute, useRouter } from 'vue-router';
import { useUserProfileStore } from '../../stores/userprofile';
import api from "../../http/api";

const props = defineProps({
    review: Object
})

const router = useRouter()
const route = useRoute();
const userStore = useUserProfileStore()
const { fetchAllUsers, users } = userStore;
// const names = ref([]);
const user = ref([])
const matchingUser = ref([])

onMounted(async () => {
    await fetchAllUsers();
    matchingUser.value = userStore.users.find(u => u.id === props.review.user_id);
});


const displayStars = (score) => {
  if (props.review.score === 1) {
    return '★☆☆☆☆';
  } else if (props.review.score === 2) {
    return '★★☆☆☆';
  } else if (props.review.score === 3) {
    return '★★★☆☆';
  } else if (props.review.score === 4) {
    return '★★★★☆';
  } else if (props.review.score === 5) {
    return '★★★★★';
  }
};
</script>