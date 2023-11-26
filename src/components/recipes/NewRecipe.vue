<template>
  <div class="text-gray-600 body-font mt-24 relative">
    <div class="container px-5 pt-11 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">レシピを書く</h1>
          <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
        </div>
    </div>
  </div>
    <RecipeCropper  @file-selected="handleFileSelected" @trimming-data="handleTrimmingData" />
  
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
  
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">カテゴリー</label>
                <div class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <div class="flex ">
                    <div class="w-1/3">
                      <input
                        type="radio"
                        id="1"
                        value="1"
                        v-model="inputtingCategoryAgeId"
                        class="mr-4"
                      />
                      <label>5、6ヶ月(初期)</label>
                    </div>
                    <div class="w-1/3">
                      <input
                      type="radio"
                      id="2"
                      value="2"
                      v-model="inputtingCategoryAgeId"
                      class="mr-4"
                      />
                      <label>7、8ヶ月(中期)</label>
                    </div>
                    <div class="w-1/3">
                      <input
                      type="radio"
                      id="3"
                      value="3"
                      v-model="inputtingCategoryAgeId"
                      class="mr-4"
                      />
                      <label>9~11ヶ月(後期)</label>
                    </div>
  
                  </div>
                </div>
              </div>
            </div>
  
  
  
            <div class="p-2 w-full">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">タイトル</label>
                <input 
                  type="text" 
                  placeholder="鮭とブロッコリーのおかゆ"
                  v-model="inputtingTitle"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">所要時間(分)</label>
                <input 
                  type="number"
                  placeholder="30"
                  v-model="inputtingTime"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">費用目安(円)</label>
                <input 
                  type="number"
                  placeholder="1200"
                  v-model="inputtingPrice"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-full">
              <button 
                @click="addNewRecipe"
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
  import { ref, reactive } from 'vue'
  import { useRecipeStore } from '../../stores/recipe';
  import RecipeCropper from './RecipeCropper.vue';
  import { useUploadStore } from '../../stores/upload';
  import { imageUpload } from '../../http/upload-api';
  import { useRouter } from 'vue-router';
  
  const newRecipe = reactive({
    title: '',
    time: '',
    price: '',
    filename: '',
    category_age_id: ''
  })
  
  const router = useRouter();
  
  const store = useRecipeStore()
  const storeUpload = useUploadStore()
  const { handleAddedRecipe } = store
  const { uploadRecipeImage } = storeUpload
  
  const inputtingTitle = ref('')
  const inputtingTime = ref('')
  const inputtingPrice = ref('')
  const inputtingCategoryAgeId = ref('')
  const inputtingFilename = ref('')
  const selectedFile = ref(null);
  
  const inputtingIngredient = ref('')
  const inputtingAmount = ref('')
  const inputtingRecipeId = ref('')
  
  
  const emit  = defineEmits(['file-selected', 'added']);
  
  const trimmingInfo = ref({x: 0, y: 0, height: 0, width: 0});
  const formData = new FormData();
  
  const handleTrimmingData = (data) => {
      trimmingInfo.value = {
        x: data.x,
        y: data.y,
        height: data.height,
        width: data.width
    };
  
    formData.append('x', trimmingInfo.value.x);
    formData.append('y', trimmingInfo.value.y);
    formData.append('height', trimmingInfo.value.height);
    formData.append('width', trimmingInfo.value.width);
  };
  
  const handleFileSelected = (fileName) => {
    const file = event.target.files[0];
    if (file) {
      selectedFile.value = file;
  
      }
  };
  
  
  const addNewRecipe = async(event) => {
  
  if (selectedFile.value) {
        formData.append('file', selectedFile.value);
  
        const currentDate = new Date();
        const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('ja-JP', options);
        const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');
    
        newRecipe.title = inputtingTitle.value
        newRecipe.time = inputtingTime.value
        newRecipe.price = inputtingPrice.value
        newRecipe.category_age_id = inputtingCategoryAgeId.value
        newRecipe.filename =  `${formattedDateTime}_${selectedFile.value.name}`;
  
        try {
          await uploadRecipeImage(formData);
              console.log('アップロード成功');
              console.log('カテゴリー', newRecipe.category_age_id)
              const addedRecipe = await handleAddedRecipe(newRecipe);
          } catch (error) {
              console.error('アップロードエラー:', error);
        }
        
        inputtingTitle.value = '';
        inputtingTime.value = '';
        inputtingPrice.value = '';
  
  
    }
  }
  
  
  
  </script>