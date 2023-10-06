<template>
    <main>
        <NewManual />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useManualStore } from '../../stores/manual';
import api from "../../http/api";
import NewManual from '../../components/manuals/NewManual.vue';

const store = useManualStore()
const { manuals } = storeToRefs(store)
const { fetchAllManuals } = store

onMounted(async () => {
    await fetchAllManuals()
})
</script>