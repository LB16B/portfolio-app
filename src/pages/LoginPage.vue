<template>
    <main class="mx-auto mb-52">
        <form 
            class="bg-red-100 w-1/2 mt-48 pt-20 mx-auto" 
            @submit.prevent="handleSubmit">
            <h1 class="mb-20 mx-auto h2 text-center">ログイン</h1>
            <div class="form-floating mb-4 w-2/3 mx-auto">
                <input type="email" 
                class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300"  
                :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
                <label for="email">メールアドレス</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-4 w-2/3 mx-auto">
                <input type="password" 
                class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300" 
                :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">パスワード</label>
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>

            <div class="flex justify-center pb-14 mt-16">
                <button class="w-34 h-14 text-center flex items-center justify-center text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-lg text-xl" type="submit">ログインする</button>
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

