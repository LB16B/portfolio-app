<template>
    <!-- <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-24 mx-auto">
            <h1>Login</h1>
            <button 
                @click="handleClick"
                class="inline-flex items-center bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-xl">
                    Login
            </button>
        </div>
    </section> -->

<section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
        <form 
            @submit.prevent="handleSubmit"
            class="lg:w-1/2 mx-auto bg-gray-100 rounded-lg p-8"
        >
            <h2 class="text-gray-900 text-lg font-medium title-font mb-5">ログイン</h2>
            <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">※メールアドレス(必須)</label>
                <input type="text" id="email" name="email" placeholder="メールアドレス" v-model="form.email"
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <div class="relative mb-4">
                <label for="password" class="leading-7 text-sm text-gray-600">※パスワード(必須)</label>
                <input type="password" id="password" name="password" placeholder="パスワード" v-model="form.password"
                    class="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </div>
            <button 
                class="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">ログインする</button>
        </form>
    </div>
</section>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter()
const store = useAuthStore()

const form = reactive({
    email: '',
    password: ''
})



const handleSubmit = async () => {
    await store.handleLogin(form)
    router.push({ name: 'recipes' })
}
</script>