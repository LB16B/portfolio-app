<template>

                    <!-- <p class="leading-relaxed text-base">{{ food.ingredient }} ........ {{ food.amount }}</p> -->


</template>

<script setup >
import { ref, computed } from "vue";
import { useFoodStore } from "../../stores/food";

const store = useFoodStore()

const props = defineProps({
    food: Object,
})

</script>