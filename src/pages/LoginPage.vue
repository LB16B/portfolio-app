<template>
    <main class="auth-wrapper">
        <form class="auth-form" @submit.prevent="handleSubmit">
            <h1>
                <span>ToeDoe</span>
                <strong>List</strong>
            </h1>
            <h2 class="h3 mb-4 fw-normal">Please sign in</h2>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
                <label for="email">Email</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">Password</label>
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
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
        router.push({ name: 'recipes' })
    }
}
</script>

<style scoped>
.auth-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 60vh;
    margin-top: 2rem;
}

.auth-form {
    width: 400px;
}
</style>

<!-- <template>

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
                class="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
            >
                ログインする
            </button>
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
</script> -->