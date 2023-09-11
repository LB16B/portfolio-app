<template>

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
                    <!-- <input type="file" @change="handleFileChange"> -->
                    <!-- <a
                        href="#"
                        role="button"
                        @click.prevent="handleFileChange"
                    >
                        画像選択
                    </a> -->
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

const vFocus = {
    mounted: (el) => el.focus()
}

const UpdateRecipe = async () => {
        const updatedRecipe = {
            ...props.recipe,
            title: editingRecipeTitle.value,
            time: editingRecipeTime.value,
            price: editingRecipePrice.value,
        };
        isEdit.value = false;
        emit('updated', updatedRecipe);
};

const undo = () => {
    isEdit.value = false
    editingRecipeTitle.value = props.recipe.title
    editingRecipeTime.value = props.recipe.time
    editingRecipePrice.value = props.recipe.price
}

const removeRecipe = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.recipe)
    }
}
</script>