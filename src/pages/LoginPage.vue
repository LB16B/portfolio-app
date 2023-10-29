<template>
    <main class="w-2/5 mx-auto mt-40">
        <form class=" bg-red-50 p-8 w-3/4 mx-auto rounded-md" @submit.prevent="handleSubmit">
            <h1 class="mt-6 mb-14 h2 text-center ">ログイン</h1>
            <div class="form-floating my-10">
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email && errors.email[0] }" id="email" v-model="form.email" placeholder="name@example.com" />
                <label for="email">メールアドレス</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.password && errors.password[0] }" id="password" v-model="form.password" placeholder="Password" />
                <label for="password">パスワード</label>
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>

            <button class="w-1/3 md:w-2/3 mx-auto items-center flex pl-10 mt-12 mb-6  bg-pink-500 rounded h-12 text-white text-xl hover:bg-pink-600" type="submit">ログインする</button>
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

