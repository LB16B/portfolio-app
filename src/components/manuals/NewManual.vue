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
                    v-model="inputtingBody"
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
                    v-model="inputtingBody2"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">調理手順3</label>
                  <input 
                    type="text"
                    placeholder="1200"
                    v-model="inputtingBody3"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">調理手順4</label>
                  <input 
                    type="text"
                    placeholder="1200"
                    v-model="inputtingBody4"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">調理手順5</label>
                  <input 
                    type="text"
                    placeholder="1200"
                    v-model="inputtingBody5"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>

              <div class="p-2 w-full">
                <button 
                  @click="addNewManual"
                  class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  投稿する
                </button>
                <meta name="csrf-token" content="{{ csrf_token() }}">
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useManualStore } from '../../stores/manual';
import { useRouter } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

const newManual = reactive({
    body: '',
    recipe_id: '',
})

// パラメーター取得
const router = useRouter();
const route = router.currentRoute;
const recipeId = route.value.params.recipeId;

const store = useManualStore()
const { handleAddedManual } = store
const inputtingBody = ref('')
const inputtingBody2 = ref('')
const inputtingBody3 = ref('')
const inputtingBody4 = ref('')
const inputtingBody5 = ref('')

onBeforeRouteUpdate((to,from, next) => {
    const recipeId = to.params.recipeId;
    next();
});

const addNewManual = async () => {
    try {
        const manualItems = [
            { body: inputtingBody },
            { body: inputtingBody2 },
            { body: inputtingBody3 },
            { body: inputtingBody4 },
            { body: inputtingBody5 }
        ];

        const promises = manualItems.map(async (manualItem) => {
            const newManualData = {
                body: manualItem.body.value,
                recipe_id: recipeId
            };
            await handleAddedManual(newManualData);
        });
        // 全てにhandleAddedManualを呼び出す
        await Promise.all(promises);

        // ループでリファレンスをクリア
        manualItems.forEach((manualItem) => {
            manualItem.body.value = '';
        });
    } catch (error) {
        console.log('エラー', error)
    }
};
</script>