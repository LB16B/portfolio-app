<template>
<div class="text-gray-600 body-font mt-24 relative">
    <div class="container px-5 pt-11 mx-auto">
        <div class="flex flex-col text-center w-full">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">レシピを編集</h1>
            <div class="lg:w-1/3 mx-auto leading-relaxed text-base border-2"></div>
        </div>
    </div>
</div>

    <EditRecipeCropper 
        :recipeFilename="props.recipe.filename"
        @file-selected="handleFileSelected" 
        @trimming-data="handleTrimmingData"
    />

<section 
@dblclick="$event => isEdit = true" class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
                <img 
                alt="recipe image" 
                :src="getImagePath(recipe.filename)"
                class="w-full lg:h-auto h-64 object-cover object-center rounded"
                >
        <div class="p-2 w-full">
            <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">タイトル</label>
                    <input 
                        type="text" 
                        v-focus
                        @keyup.esc="undo"
                        v-model="editingRecipeTitle"
                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">所要時間(分)</label>
            <input 
                type="number"
                v-focus
                @keyup.esc="undo"
                v-model="editingRecipeTime"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-full">
            <div class="relative">
            <label for="email" class="leading-7 text-sm text-gray-600">費用目安(円)</label>
            <input 
                type="number"
                v-focus
                @keyup.esc="undo"
                v-model="editingRecipePrice"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
        </div>
        <div class="p-2 w-full">
            <button 
            @click="UpdateRecipe"
            class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
            >
                編集を完了する
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

const store = useRecipeStore()
const storeUpload = useUploadStore()
const { uploadRecipeImage } = storeUpload
const selectedFile = ref(null);

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
  return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

const emit = defineEmits(['updated', 'removed'], ['file-selected', added]);

const trimmingInfo = ref({ x: 0, y: 0, height: 0, width: 0 });


const isEdit = ref(false)
const editingRecipeTitle = ref(props.recipe.title)
const editingRecipeTime = ref(props.recipe.time)
const editingRecipePrice = ref(props.recipe.price)
const editingFilename = ref(props.recipe.filename)

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
            filename: newFileName,
        };
        

        isEdit.value = false;
        emit('updated', updatedRecipe);
        await uploadRecipeImage(formData);

  


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