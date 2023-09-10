<template>
    <main>
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        投稿したレシピ
                    </h1>
                </div>
                    <MyRecipes :recipes="filteredRecipes" />
            </div>
        </section>

    </main>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia"
import { useRecipeStore } from "../../stores/recipe";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import MyRecipes from '../../components/recipes/MyRecipes.vue';
import api from "../../http/api";

const store = useRecipeStore()
const auth_store = useAuthStore()
const router = useRouter
const { recipes } = storeToRefs(store)
const { fetchAllRecipes } = store

onMounted(async () => {
    await fetchAllRecipes()
});

const filteredRecipes = computed(() => {
    const loggedInUserName = auth_store.user.id;
    return recipes.value.filter(recipe => recipe.user_id === loggedInUserName);
});



</script>
