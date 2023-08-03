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
                    <span v-else>{{ recipe.title }}</span>
                    <!-- <span>{{ recipe.time }}</span>
                    <span>{{ recipe.filename }}</span> -->
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