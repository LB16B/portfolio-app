<template>
    {{ manual }}
</template>

<script setup>
import { ref, computed } from "vue";
import { useManualStore } from "../../stores/manual";

const store = useManualStore()

const props = defineProps({
    manual: Object
})
</script>