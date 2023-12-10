<template>
  
  
  <section class="text-gray-600 body-font relative mt-20">
    <div class="container px-5 py-24 mx-auto bg-red-50 w-2/3">

      

              <div class="flex flex-col text-center w-full">
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">調理手順</h1>
              </div>
 


        <div class="w-2/3 mx-auto ">
          <div class="flex flex-wrap -m-2">
  
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">調理手順1</label>
                <input 
                  type="text" 
                  placeholder="焼き麩は水で戻す（7、8カ月頃は戻さずすりおろす）。"
                  v-model="inputtingBody"
                  class="w-full bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">調理手順2</label>
                <input 
                  type="text"
                  placeholder="➀、解凍したミックス、水、片栗粉を混ぜ合わせる。"
                  v-model="inputtingBody2"
                  class="w-full bg-white rounded border  focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">調理手順3</label>
                <input 
                  type="text"
                  placeholder="ふんわりラップをする。"
                  v-model="inputtingBody3"
                  class="w-full bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">調理手順4</label>
                <input 
                  type="text"
                  placeholder="電子レンジで50秒～1分加熱し混ぜる。"
                  v-model="inputtingBody4"
                  class="w-full bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">調理手順5</label>
                <input 
                  type="text"
                  placeholder="少し冷ましてお皿に盛る。"
                  v-model="inputtingBody5"
                  class="w-full bg-white rounded border  focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>

            <div class="p-2 w-full mt-8">
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