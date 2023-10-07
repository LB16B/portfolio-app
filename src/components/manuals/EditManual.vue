<template>
<div class="text-gray-600 body-font mt-24 relative">
    <div class="container px-5 pt-11 mx-auto">
        <div class="flex flex-col text-center w-full">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">レシピを書く</h1>
            <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
        </div>
    </div>
</div>


<section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
                <div class="p-2 w-full">
                    <div class="relative">
                    <label for="name" class="leading-7 text-sm text-gray-600">調理手順1</label>
                    <input 
                        type="text" 
                        placeholder="鮭とブロッコリーのおかゆ"
                        v-model="firstManualBody"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                    </div>
                </div>
                <div class="p-2 w-full">
                    <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">調理手順2</label>
                    <input 
                        type="text"
                        placeholder="30"
                        v-model="secondManualBody"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                </div>
                <div class="p-2 w-full">
                    <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">調理手順3</label>
                    <input 
                        type="text"
                        placeholder="1200"
                        v-model="thirdManualBody"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                </div>
                <div class="p-2 w-full">
                    <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">調理手順4</label>
                    <input 
                        type="text"
                        placeholder="1200"
                        v-model="fourthManualBody"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                </div>
                <div class="p-2 w-full">
                    <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-600">調理手順5</label>
                    <input 
                        type="text"
                        placeholder="1200"
                        v-model="fifthManualBody"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    </div>
                </div>
                <div class="p-2 w-full">
                    <button 
                        @click="updateManuals"
                        class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                        >
                        変更する
                    </button>
                    <meta name="csrf-token" content="{{ csrf_token() }}">
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import { useManualStore } from "../../stores/manual";
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
    manuals: Array,
})

const store = useManualStore()
const { handleUpdatedManual } = store

const emit = defineEmits(["updated"])

const firstManualId = ref('')
const firstManualBody = ref('')

const secondManualId = ref('')
const secondManualBody = ref('')

const thirdManualId = ref('')
const thirdManualBody = ref('')

const fourthManualId = ref('')
const fourthManualBody = ref('')

const fifthManualId = ref('')
const fifthManualBody = ref('')

watch(props, (newProps) => {
    const { manuals } = newProps;
    const [manual1 = {}, manual2 = {}, manual3 = {}, manual4 = {}, manual5 = {}] = manuals;

    firstManualId.value = manual1.id || '';
    firstManualBody.value = manual1.body || '';

    secondManualId.value = manual2.id || '';
    secondManualBody.value = manual2.body || '';

    thirdManualId.value = manual3.id || '';
    thirdManualBody.value = manual3.body || '';

    fourthManualId.value = manual4.id || '';
    fourthManualBody.value = manual4.body || '';

    fifthManualId.value = manual5.id || '';
    fifthManualBody.value = manual5.body || '';
}, { deep: true });

const updateManuals = async (event) => {
    const manuals = [
        {
            id: firstManualId.value,
            body: firstManualBody.value,
        },
        {
            id: secondManualId.value,
            body: secondManualBody.value,
        },
        {
            id: thirdManualId.value,
            body: thirdManualBody.value,
        },
        {
            id: fourthManualId.value,
            body: fourthManualBody.value,
        },
        {
            id: fifthManualId.value,
            body: fifthManualBody.value,
        },
    ];

    for ( const manual of manuals ) {
        handleUpdatedManual(manual);
    }

    emit("updated", manuals);
};
</script>