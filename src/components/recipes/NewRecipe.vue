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
    <div class="relative">
        <span>Filename</span>
        <input
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            v-model="inputtingFilename" type="text"
            />
            <!-- @keydown.enter="addNewRecipe" -->
        </div>
        <button @click="addNewRecipe">create</button>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
const inputtingTitle = ref('')
const inputtingTime = ref('')
const inputtingPrice = ref('')
const inputtingFilename = ref('')

const newRecipe = reactive({
    title: '',
    time: '',
    price: '',
    filename: ''
})

const emit = defineEmits(['added'])

const addNewRecipe = event => {
    // if (event.target.value.trim()) {
        newRecipe.title = inputtingTitle.value
        newRecipe.time = inputtingTime.value
        newRecipe.price = inputtingPrice
        newRecipe.filename = inputtingFilename
        event.target.value = ""
        console.log(inputtingTitle)
        emit('added', newRecipe)
    // }
}

</script>