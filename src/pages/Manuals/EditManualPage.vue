<template>
    <main>
        <EditManual :manuals="filteredManual" />
    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from 'vue-router';
import { useManualStore } from "../../stores/manual";
import Manuals from '../../components/manuals/Manuals.vue'
import EditManual from '../../components/manuals/EditManual.vue'
import api from "../../http/api";

// manual
const manualStore = useManualStore()
const { manuals } = storeToRefs(manualStore)
const { fetchAllManuals } = manualStore

onMounted(async () => {
    await fetchAllManuals()
});

// パラメーター
const route = useRoute();
let urlParameterRecipeId = null;

onMounted(() => {
    urlParameterRecipeId = route.params.recipeId;
});

const filteredManual = computed(() => {
    return manuals.value.filter(manual => manual.recipe_id === Number(urlParameterRecipeId));
});




</script>
