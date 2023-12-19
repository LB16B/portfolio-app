<template>
    <div class="text-gray-600 body-font mt-24 relative">
      <div class="container px-5 pt-11 mx-auto">
          <div class="flex flex-col text-center w-full">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">レシピを書く</h1>
            <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
          </div>
      </div>
    </div>
      <EditRecipeCropper 
        :fileName="props.recipe.filename"  
        @file-selected="handleFileSelected"
        @trimming-data="handleTrimmingData" 
      />
      
    
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto bg-red-100 rounded-lg lg:w-1/2">
          <div class=" mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">カテゴリー</label>
                  <div class="w-full  bg-white  rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    <div class="flex ">
                      <div class="w-1/3">
                        <input
                          type="radio"
                          id="1"
                          value="1"
                          v-model="editingRecipeCategoryAgeId"
                          class="mr-4"
                        />
                        <label>5、6ヶ月(初期)</label>
                      </div>
                      <div class="w-1/3">
                        <input
                        type="radio"
                        id="2"
                        value="2"
                        v-model="editingRecipeCategoryAgeId"
                        class="mr-4"
                        />
                        <label>7、8ヶ月(中期)</label>
                      </div>
                      <div class="w-1/3">
                        <input
                        type="radio"
                        id="3"
                        value="3"
                        v-model="editingRecipeCategoryAgeId"
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
                    v-model="editingRecipeTitle"
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">所要時間(分)</label>
                  <input 
                    type="number"
                    placeholder="30"
                    v-model="editingRecipeTime"
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">費用目安(円)</label>
                  <input 
                    type="number"
                    placeholder="1200"
                    v-model="editingRecipePrice"
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
              </div>
              <div class="p-2 w-full">
                <button 
                  @click="UpdateRecipe"
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
import { ref, computed } from "vue";
import RecipeActions from './RecipeActions.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import EditRecipeCropper  from './EditRecipeCropper.vue'
import { useUploadStore } from "../../stores/upload";
import { useRecipeStore } from "../../stores/recipe";
import RecipeCropper from './RecipeCropper.vue';


// モーダルウィンドウ

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};


// レシピ編集

const store = useRecipeStore()
const storeUpload = useUploadStore()
const { uploadRecipeImage } = storeUpload
const selectedFile = ref(null);

const path = "http://localhost:8000/recipe_images/";


const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

function getImagePath(filename) {
  return path + filename;
}

const emit = defineEmits(['updated', 'removed'], ['file-selected', added]);



const isEdit = ref(false)
const editingRecipeTitle = ref(props.recipe.title)
const editingRecipeTime = ref(props.recipe.time)
const editingRecipePrice = ref(props.recipe.price)
const editingRecipeCategoryAgeId = ref(props.recipe.category_age_id)
const editingFilename = ref(props.recipe.filename)

const trimmingInfo = ref({ x: 0, y: 0, height: 0, width: 0 });
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


const vFocus = {
    mounted: (el) => el.focus()
}

const handleFileSelected = (filename) => {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
    }
};

const UpdateRecipe = async (event) => {
        formData.append('file', selectedFile.value);

    if (selectedFile.value) {

        const currentDate = new Date();
        const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('ja-JP', options);
        const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');
        const newFileName = `${formattedDateTime}_${selectedFile.value.name}`;
    
        
        const updatedRecipe = {
            ...props.recipe,
            title: editingRecipeTitle.value,
            time: editingRecipeTime.value,
            price: editingRecipePrice.value,
            category_age_id: editingRecipeCategoryAgeId.value,
            filename: newFileName,
        };
        
        

        isEdit.value = false;
        emit('updated', updatedRecipe);
        await uploadRecipeImage(formData);
    } else {

        const updatedRecipe = {
            ...props.recipe,
            title: editingRecipeTitle.value,
            time: editingRecipeTime.value,
            price: editingRecipePrice.value,
            category_age_id: editingRecipeCategoryAgeId.value,
            filename: editingFilename.value

        }
        isEdit.value = false;
        emit('updated', updatedRecipe);
        // console.log(editingFilename.value)
        console.log('画像なし成功')
    }



};

const undo = () => {
    isEdit.value = false
    editingRecipeTitle.value = props.recipe.title
    editingRecipeTime.value = props.recipe.time
    editingRecipePrice.value = props.recipe.price
}
const router = useRouter(); // ルーターインスタンスを取得

const removeRecipe = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.recipe)
    }

    router.push('/my_recipes')
}
</script>

<style>
/* モーダルのスタイルをここで設定 */
.modal {
    display: block; /* モーダルを表示する */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 2000px;
}

.close-button {
    float: right;
    cursor: pointer;
}
</style>













