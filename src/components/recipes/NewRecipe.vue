<template>
    <div class="relative">
        <input type="text"
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new recipe. Press enter to save."
            @keydown.enter="addNewRecipe"
            />
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const newRecipe = reactive({
    title: '',
    time: '',
    price: '',
    filename: ''
})

const emit = defineEmits(['added'])

const addNewRecipe = event => {
    if (event.target.value.trim()) {
        newRecipe.title = event.target.value
        newRecipe.time = 4;
        newRecipe.price = '4';
        newRecipe.filename = 'ddddd';
        // newRecipe.title = event.target.value
        // newRecipe.time = '';
        // newRecipe.price = '';
        // newRecipe.filename = '';
        event.target.value = ""
        emit('added', newRecipe)
    }
}
</script>