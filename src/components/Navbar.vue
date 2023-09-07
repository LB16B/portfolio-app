<template>
    <div class="text-gray-600 body-font bg-red-100">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav 
            v-if="store.isLoggedIn"
            class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center justify-center text-xl">
            <!-- <router-link :to="{ name: 'recipes' }" class="mr-5 hover:text-gray-900">Recipes</router-link> -->
            <a 
              href="#"
              @click.prevent="$event => $router.push('/recipes')" 
              class="mr-5 hover:text-gray-900"
            >
              Recipes
            </a>
            <a 
              href="#"
              @click.prevent="$event => $router.push('/show_recipe')" 
              class="mr-5 hover:text-gray-900"
            >
              ShowRecipes
            </a>
            <router-link 
              :to="{ name: 'new_recipe' }"
              class="mr-5 hover:text-gray-900"
              >
              NewRecipe
            </router-link>
            <router-link 
              :to="{ name: 'my_recipes' }"
              class="mr-5 hover:text-gray-900"
              >
              MyRecipes
            </router-link>
            <a class="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <template v-if="!store.isLoggedIn">
            <router-link :to="{ name: 'login' }" class="inline-flex items-center bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-xl">
              Login
            </router-link>
            <router-link :to="{ name: 'register' }" class="inline-flex items-center bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-xl">
              Register
            </router-link>
          </template>
          <template v-else>
            <p>{{ store.user.name }}</p>
            <a href="#" @click.prevent="logout"
              class="inline-flex items-center bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-xl">
              Logout
            </a>
          </template>
        </div>
      </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter
const store = useAuthStore()

const logout = async () => {
  await store.handleLogout()
  router.push({ name: 'login' })
}
</script>

<style scoped>


</style>