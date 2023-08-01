<template>
    <div class="relative">
        <span>Title</span>
        <input
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            v-model="inputtingTitle" type="text"
            />
            <!-- @keydown.enter="addNewRecipe" -->
    </div>
    <div class="relative">
        <span>Time</span>
        <input
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            v-model="inputtingTime" type="number"
            />
            <!-- @keydown.enter="addNewRecipe" -->
    </div>
    <div class="relative">
        <span>Price</span>
        <input
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            v-model="inputtingPrice" type="number"
            />
            <!-- @keydown.enter="addNewRecipe" -->
    </div>
    <!-- <div class="relative">
        <span>Filename</span>
        <input
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            v-model="inputtingFilename" type="text"
            />
    </div> -->
    <input type="file" @change="onFileChange" />
    <button @click="addNewRecipe">create</button>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
const inputtingTitle = ref('')
const inputtingTime = ref('')
const inputtingPrice = ref('')
const inputtingFilename = ref('')
const selectedFile = ref(null);

const newRecipe = reactive({
    title: '',
    time: '',
    price: '',
    filename: ''
})

// ファイルが選択された際に呼ばれる処理
const onFileChange = event => {
    const file = event.target.files[0];
    if (file) {
    // 選択されたファイルをリアクティブな変数にセット
    selectedFile.value = file;
    }
};

const emit = defineEmits(['added'])

const addNewRecipe = event => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const formattedTime = currentDate.toLocaleTimeString().replace(/:/g, '-');

    // if (event.target.value.trim()) {
        newRecipe.title = inputtingTitle.value
        newRecipe.time = inputtingTime.value
        newRecipe.price = inputtingPrice.value
        newRecipe.filename =  `${formattedDate}_${formattedTime}_${selectedFile.value.name}`;
        event.target.value = ""
        emit('added', newRecipe)
    // }
}

</script>