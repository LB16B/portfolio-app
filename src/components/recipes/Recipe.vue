<template>

    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <div class="ms-2 flex-grow-1" 
                title="Double click the text to edit or remove"
                @dblclick="$event => isEdit = true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" 
                        type="text"
                        v-focus
                        @keyup.esc="undo"
                        v-model="editingRecipeTitle"
                    />
                    <input class="editable-task" 
                        type="number"
                        v-focus
                        @keyup.esc="undo"
                        v-model="editingRecipeTime"
                    />
                    <input class="editable-task" 
                        type="number"
                        v-focus
                        @keyup.esc="undo"
                        v-model="editingRecipePrice"
                    />
                    <input type="file" @change="handleFileChange">
                    <button @click="UpdateRecipe">update</button>
                </div>
                <div v-else class="">
                    <p>Title : {{ recipe.title }}</p>
                    <p>Time : {{ recipe.time }}</p>
                    <p>Price : {{ recipe.price }}</p>
                    <p>filename : {{ recipe.filename }}</p>
                    <!-- <div class="m-6 space-x-3">
                        <a class="w-20 h-20 inline-block">
                            <img class="object-contain w-20 h-20" :src="getImagePath(recipe.filename)" alt="uu">
                        </a>
                    </div> -->
                </div>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>
        <RecipeActions
            @edit="isEdit = true" v-show="!isEdit"
            @remove="removeRecipe"
        />
    </li>
</template>

<script setup>

import { ref } from "vue";
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
            const response = await fetch('http://localhost:8000/api/v1/upload', {
                method: 'POST',
                body: formData
            });

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