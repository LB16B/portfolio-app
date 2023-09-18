<template>
    <main>
        <NewFood />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useFoodStore } from '../../stores/food';
import api from "../../http/api";
// import foods from '../../components/foods/Foods.vue';
import NewFood from '../../components/foods/NewFood.vue'

const foodStore = useFoodStore()
const { foods } = storeToRefs(foodStore)
const { fetchAllFoods } = foodStore

onMounted(async () => {
    await fetchAllFoods()
})
</script>