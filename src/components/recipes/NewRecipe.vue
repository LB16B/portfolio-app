<template>
    <RecipeCropper  @file-selected="handleFileSelected" @trimming-data="handleTrimmingData" />

    <div>
      x: {{ trimmingInfo.x }}<br>
      y: {{ trimmingInfo.y }}<br>
      高さ: {{ trimmingInfo.height }}<br>
      幅: {{ trimmingInfo.width }}
    </div>

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
          
          <!-- <input type="file" @change="onFileChange" /> -->
    
    <button @click="addNewRecipe">create</button>
</template>


<script setup>
import { ref, reactive, defineEmits, defineProps } from 'vue'
import RecipeCropper from './RecipeCropper.vue';
const inputtingTitle = ref('')
const inputtingTime = ref('')
const inputtingPrice = ref('')
const inputtingFilename = ref('')

const selectedFile = ref(null);
const emit  = defineEmits(['file-selected', 'added']);

const trimmingInfo = ref({ x: 0, y: 0, height: 0, width: 0 }); // リアクティブなデータとして定義

const handleTrimmingData = (data) => {
  // console.log(data);
    // trimmingInfoに値を更新する
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
    filename: ''
})

const handleFileSelected = (fileName) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;

    }
};


const addNewRecipe = event => {
  
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    //   const formData = new FormData();
    formData.append('x', trimmingInfo.value.x);
    formData.append('y', trimmingInfo.value.y);
    formData.append('height', trimmingInfo.value.height);
    formData.append('width', trimmingInfo.value.width);

      fetch('http://localhost:8000/api/v1/upload', {
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
        const currentDate = new Date();
        const options = { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('ja-JP', options);
        const formattedDateTime = formatter.format(currentDate).replace(/[/, :]/g, '');
    
        newRecipe.title = inputtingTitle.value
        newRecipe.time = inputtingTime.value
        newRecipe.price = inputtingPrice.value
        newRecipe.filename =  `${formattedDateTime}_${selectedFile.value.name}`;
        event.target.value = ""


      //   emit('file-selected', formData)
        emit('added', newRecipe)
      }).catch(error => {
        // エラーが発生した場合の処理をここに記述する
      });
  }
}


</script>