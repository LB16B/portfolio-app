<template>

    <div v-if="store.isLoggedIn" class="text-gray-600 body-font bg-red-100 reactive h-36">

      
      <div class="flex justify-center py-4 mx-auto  w-2/3"  >
        <a href="http://localhost:5173/top" class="flex title-font font-medium items-center2 text-gray-900 mr-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Tailblocks</span>
        </a>
        <RecipeSearch class=""  />

        <div class="ml-12 flex items-center  relative w-1/12 h-14">
          <img 
          @click="pullDown"
          class="rounded-full h-14 w-14 absolute bottom-2"
          v-if="store.user && store.user.filename" :src="'http://localhost:8000/profile_images/' + store.user.filename"
          />
    
          <div class="absolute top-12 w-40 right-2">
            <div v-if="isPullDownVisible" class="bg-red-50 rounded mt-2 p-2 ">
              <a href="#" @click.prevent="logout"
                class="flex items-center justify-center">
                Logout
              </a>
            </div>
          </div>
        </div>

      </div>
        <div class="md:mr-auto  flex flex-wrap  mx-auto justify-center text-xl pt-8 relative w-3/5">
          <nav 
            v-if="store.isLoggedIn"
            class="absolute bottom-0">
            <router-link 
              :to="{ name: 'new_recipe' }"
              class="mr-5 hover:text-gray-900 "
              >
              レシピを投稿する
            </router-link>
            <router-link 
              :to="{ name: 'my_recipes' }"
              class="mr-5 hover:text-gray-900"
              >
              投稿したレシピ
            </router-link>
            <router-link 
            :to="{ name: 'change_password' }"
            class="mr-5 hover:text-gray-900"
            >
            パスワードを変更する
            </router-link>

            <router-link 
            :to="{ name: 'user_profile' }"
            class="mr-5 hover:text-gray-900"
            >
            プロフィールを編集する
            </router-link>

          </nav>

        </div>
        
      </div>

      <div
        v-if="!store.isLoggedIn"
          class=" mx-auto relative bg-red-100 h-20"
        >
        <div class=" h-full w-3/5 flex mx-auto relative">
          <div class="absolute left-0 bottom-6">
            <a href="http://localhost:5173/top" class="flex title-font font-medium items-center2 text-gray-900 mr-10 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="ml-3 text-xl">Tailblocks</span>
            </a>
          </div>
          <nav class="absolute right-0 bottom-6">
            <router-link :to="{ name: 'login' }" class="inline-flex items-center bg-pink-500 border-0 py-2 mr-2 px-4 text-white focus:outline-none hover:bg-pink-600 rounded md:mt-0 text-xl">
              Login
            </router-link>
            <router-link :to="{ name: 'register' }" class="inline-flex items-center bg-pink-500 border-0 py-2 px-3 focus:outline-none text-white hover:bg-pink-600 rounded md:mt-0 text-xl">
              Register
            </router-link>
          </nav>
        </div>
      </div>
        
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import RecipeSearch from './RecipeSearch.vue';

const router = useRouter
const store = useAuthStore()
const isPullDownVisible = ref(false);

const pullDown = () => {
  isPullDownVisible.value = !isPullDownVisible.value;
}

const logout = async () => {
  await store.handleLogout()
  router.push({ name: 'login' })
}
</script>
