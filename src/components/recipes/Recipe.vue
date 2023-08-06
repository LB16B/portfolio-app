<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0 completed" type="checkbox" />
            <div class="ms-2 flex-grow-1" 
                title="Double click the text to edit or remove"
                @dblclick="$event => isEdit = true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" 
                        type="text"
                        v-focus
                        @keyup.esc="undo"
                        @keyup.enter="updateRecipe"
                        v-model="editingRecipe"
                    />
                </div>
                <div v-else class="">
                    <span>{{ recipe.title }}</span>
                    <span>{{ recipe.time }}</span>
                    <!-- 取り合えずここに画像を表示したい -->
                    <div class="m-6 space-x-3">
                        <a class="w-20 h-20 inline-block">
                            <img class="object-contain w-20 h-20" :src="getImagePath(recipe.filename)" alt="uu">
                        </a>
                    </div>
                    <!-- <span>{{ recipe.filename }}</span> -->
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
const filename = "202308060848_42fb87160b1b862507ba226e778d2ffd-12.jpg"; // ファイル名を変数に設定

function getImagePath(filename) {
  return path + filename;
}

const props = defineProps({
    recipe: Object
})

const emit = defineEmits(['updated', 'removed'])

const isEdit = ref(false)
const editingRecipe = ref(props.recipe.title)

const vFocus = {
    mounted: (el) => el.focus()
}

const updateRecipe = event => {
    const updatedRecipe = { ...props.recipe, title: event.target.value }
    isEdit.value = false
    emit('updated', updatedRecipe)
}

const undo = () => {
    isEdit.value = false
    editingRecipe.value = props.recipe.title
}

const removeRecipe = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.recipe)
    }
}
</script>