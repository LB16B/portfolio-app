<template>
    <!-- <section class="text-gray-600 body-font overflow-hidden w-full">
        <div class="container px-5 py-24 mx-auto" @dblclick="$event => isEdit = true">
            <div  class="lg:w-4/5 mx-auto flex flex-wrap" v-if="isEdit">
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                    <input 
                    type="text"
                    v-focus
                    @keyup.esc="undo"
                    v-model="editingRecipeTitle"
                    class=" editable-task text-gray-900 text-3xl title-font font-medium mb-1 border-4" />
                    <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                    <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                      
                    <input type="file" @change="handleFileChange">
                    <button @click="UpdateRecipe">update</button>
                </div>
            </div>
            </div>
            </div>
        </section> -->

    <li class="">
        <div class="text-gray-600 body-font overflow-hidden w-full">
            <div class="" 
                title=""
                @dblclick="$event => isEdit = true"
            >
                <div class="relative lg:w-4/5 mx-auto flex flex-wrap" v-if="isEdit">
                    <img alt="recipe image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="getImagePath(recipe.filename)">
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <input class="editable-task text-sm title-font text-gray-500 tracking-widest w-full border-4 mb-4" 
                            type="text"
                            v-focus
                            @keyup.esc="undo"
                            v-model="editingRecipeTitle"
                            
                        />
                        
                        <input class="editable-task text-sm title-font text-gray-500 tracking-widest w-full border-4 mb-4" 
                            type="number"
                            v-focus
                            @keyup.esc="undo"
                            v-model="editingRecipeTime"
                        />
                        <input class="editable-task text-sm title-font text-gray-500 tracking-widest w-full border-4 mb-4" 
                            type="number"
                            v-focus
                            @keyup.esc="undo"
                            v-model="editingRecipePrice"
                        />
                    </div>
                    <input type="file" @change="handleFileChange">
                    <button @click="UpdateRecipe">update</button>
                </div>


                <div class="lg:w-4/5 mx-auto flex flex-wrap" v-else >
                    <img alt="recipe image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" :src="getImagePath(recipe.filename)">
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ recipe.title }}</h1>
                        <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div class="flex flex-col w-full">
                                    <p class="mr-3 mb-4">所要時間：{{ recipe.time }}分</p>
                                    <p>費用目安：{{ recipe.price }}円</p>
                                    <p>filename : {{ recipe.filename }}</p>
                            </diV>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RecipeActions
            @edit="isEdit = true" v-show="!isEdit"
            @remove="removeRecipe"
        />
    </li>
</template>

<script setup>
import { ref, computed } from "vue";
import RecipeActions from './RecipeActions.vue';

const path = "http://localhost:8000/recipe_images/";

function getImagePath(filename) {
  return path + filename;
}

const props = defineProps({
    recipe: Object,
    selectedFile: Object 
})

const emit = defineEmits(['updated', 'removed'])

const isEdit = ref(false)
const editingRecipeTitle = ref(props.recipe.title)
const editingRecipeTime = ref(props.recipe.time)
const editingRecipePrice = ref(props.recipe.price)
const editingRecipeFile = ref(props.recipe.filename);
const selectedFile = ref(null);
const editingSelectedFile = ref(null); // 追加


const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        editingSelectedFile.value = file;  
    }
};
const vFocus = {
    mounted: (el) => el.focus()
}

const UpdateRecipe = async () => {

    if (editingSelectedFile.value) {
        const formData = new FormData();
        formData.append('file', editingSelectedFile.value);

        try {
   

            if (response.ok) {
                const result = await response.json();
                const updatedRecipe = {
                    // ...props.recipe スプレッド演算子
                    // 既存のデータを展開して新しいオブジェクトを生成
                    // 既存のデータが保持され、編集されたデータを追加できる
                    ...props.recipe,
                    title: editingRecipeTitle.value,
                    time: editingRecipeTime.value,
                    price: editingRecipePrice.value,
                    // サーバーから返されるレスポンスに含まれるファイル名を
                    // resultオブジェクトから取得し、filenameプロパティに設定
                    filename: result.filename,
                };

                isEdit.value = false;
                emit('updated', updatedRecipe);
            } else {
                throw new Error('File upload failed.');
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        // If no file is selected, update only other recipe fields
        const updatedRecipe = {
            ...props.recipe,
            title: editingRecipeTitle.value,
            time: editingRecipeTime.value,
            price: editingRecipePrice.value,
        };

        isEdit.value = false;
        emit('updated', updatedRecipe);
    }
};

const undo = () => {
    isEdit.value = false
    editingRecipeTitle.value = props.recipe.title
    editingRecipeTime.value = props.recipe.time
    editingRecipePrice.value = props.recipe.price
    editingRecipeFilename.value = props.recipe.Filename
}

const removeRecipe = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.recipe)
    }
}
</script>