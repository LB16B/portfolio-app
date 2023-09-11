<template>
  <RecipeCropper  @file-selected="handleFileSelected" @trimming-data="handleTrimmingData" />

  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
    
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-full">
            <div class="relative">
              <label for="name" class="leading-7 text-sm text-gray-600">Title</label>
              <input 
                type="text" 
                placeholder="+ Add new recipe. Press enter to save."
                v-model="inputtingTitle"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
            </div>
          </div>
          <div class="p-2 w-full">
            <div class="relative">
              <label for="email" class="leading-7 text-sm text-gray-600">Time</label>
              <input 
                type="number"
                placeholder="+ Add new recipe. Press enter to save."
                v-model="inputtingTime"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
          </div>
          <div class="p-2 w-full">
            <div class="relative">
              <label for="email" class="leading-7 text-sm text-gray-600">Price</label>
              <input 
                type="number"
                placeholder="+ Add new recipe. Press enter to save."
                v-model="inputtingPrice"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
          </div>
          <div class="p-2 w-full">
            <button 
              @click="addNewRecipe"
              class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">
              Button
            </button>
            <meta name="csrf-token" content="{{ csrf_token() }}">

            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRecipeStore } from '../../stores/recipe';
import RecipeCropper from './RecipeCropper.vue';
import { useUploadStore } from '../../stores/upload';
import { imageUpload } from '../../http/upload-api';

const store = useRecipeStore()
const storeUpload = useUploadStore()
const { handleAddedRecipe } = store
const { uploadRecipeImage } = storeUpload
const inputtingTitle = ref('')
const inputtingTime = ref('')
const inputtingPrice = ref('')
const inputtingFilename = ref('')

const selectedFile = ref(null);
const emit = defineEmits(['file-selected', 'added']);

const trimmingInfo = ref({ x: 0, y: 0, height: 0, width: 0 }); // リアクティブなデータとして定義

const handleTrimmingData = (data) => {
  trimmingInfo.value = {
  x: data.x,
  y: data.y,
  height: data.height,
  width: data.width
};


const formData = new FormData();
  formData.append('x', trimmingInfo.value.x);
  formData.append('y', trimmingInfo.value.y);
  formData.append('height', trimmingInfo.value.height);
  formData.append('width', trimmingInfo.value.width);

};

const newRecipe = reactive({
  title: '',
  time: '',
  price: '',
  filename: '',
  user_id: ''
})

const handleFileSelected = (fileName) => {
const file = event.target.files[0];
if (file) {
  selectedFile.value = file;

  }
};

const addNewRecipe = async(event) => {

if (selectedFile.value) {

  
  const currentDate = new Date();
  const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formatter = new Intl.DateTimeFormat('ja-JP', options);
  const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');

  newRecipe.title = inputtingTitle.value
  newRecipe.time = inputtingTime.value
  newRecipe.price = inputtingPrice.value
  newRecipe.filename =  `${formattedDateTime}_${selectedFile.value.name}`;

  try {
      await uploadRecipeImage(selectedFile.value);
    } catch (error) {
      // console.error('アップロードエラー:', error);
    }

  
  inputtingTitle.value = '';
  inputtingTime.value = '';
  inputtingPrice.value = '';

  handleAddedRecipe(newRecipe)
}
}


</script>