<template>
    <div  class="p-4 lg:w-1/2 md:w-full">
        <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
            <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3 text-center">調理手順</h2>
                <div 
                    v-for="manual in manuals" 
                    :manual="manual" 
                    :key="manual.id" 
                    class="flex px-2 border-b-2"
                >
                ・ <p class="mb-4 ">{{ manual.body }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useManualStore } from '../../stores/manual';

const store = useManualStore()

const props = defineProps({
    manuals: Array
})
</script>