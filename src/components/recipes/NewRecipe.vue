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
const unixTimestamp = ref(0);

const newRecipe = reactive({
    title: '',
    time: '',
    price: '',
    filename: ''
})

const onFileChange = event => {
    const file = event.target.files[0];
    if (file) {
    selectedFile.value = file;
    }
};

const emit = defineEmits(['added'])

const addNewRecipe = event => {

    if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

      // Laravelのアップロードエンドポイントにファイルを送信
      fetch('http://localhost:8000/api/v1/upload', {
    //   fetch('api/v1/upload', {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('File upload failed.');
      }
    }).then(result => {
      // ファイルのアップロードが成功した場合の処理をここに記述する
    }).catch(error => {
      // エラーが発生した場合の処理をここに記述する
    });
}

    const currentDate = new Date();
    const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('ja-JP', options);
    const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');

        newRecipe.title = inputtingTitle.value
        newRecipe.time = inputtingTime.value
        newRecipe.price = inputtingPrice.value
        newRecipe.filename =  `${formattedDateTime}_${selectedFile.value.name}`;
        event.target.value = ""
        emit('added', newRecipe)
}

</script>