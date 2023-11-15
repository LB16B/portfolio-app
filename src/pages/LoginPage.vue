<template>
    <main class="w-2/5 mx-auto mt-40">
        <form class=" bg-red-50 p-8 w-3/4 mx-auto rounded-md" @submit.prevent="handleSubmit">
            <h1 class="mt-6 mb-14 h2 text-center ">ログイン</h1>
            <div class=" my-10">
                <input type="email" 
                class="bg-white w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  
                :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
                <label for="email">メールアドレス</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class=" mb-3">
                <input type="password" 
                class="bg-white w-full bg-opacity-50 rounded border border-pink-100 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">パスワード</label>
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>

            <div class="flex justify-center">
                <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg" type="submit">ログインする</button>
            </div>
        </form>
    </main>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter()
const store = useAuthStore()
const { isLoggedIn, errors } = storeToRefs(store)
const { handleLogin } = store

const form = reactive({
    email: '',
    password: '' 
})

const handleSubmit = async () => {
    await handleLogin(form)
    if (isLoggedIn.value) {
        router.push({ name: 'top' })
    }
}
</script>

