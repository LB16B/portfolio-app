<template>
    <main class="mx-auto mb-52">
        <form 
            class="mx-auto bg-red-100 w-1/2 mt-48 pt-20" 
            @submit.prevent="handleSubmit">
            <h1 class="mb-20 mx-auto h2 text-center">有料会員登録フォーム</h1>
            <div class="form-floating mb-4 w-2/3 mx-auto">
                <input type="text" 
                class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300" :class="{ 'is-invalid': errors.name && errors.name[0] }" id="name" v-model="form.name" placeholder="Your name" />
                <label for="name">名前</label>
                <div class="invalid-feedback" v-if="errors.name && errors.name[0]">
                    {{ errors.name && errors.name[0] }}
                </div>
            </div>
            <div class="form-floating mb-4 w-2/3 mx-auto">
                <input type="text" class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300" :class="{ 'is-invalid': errors.email && errors.email[0] }" v-model="form.email" placeholder="name@example.com" />
                <label for="email">メールアドレス</label>
                <div class="invalid-feedback" v-if="errors.email && errors.email[0]">
                    {{ errors.email && errors.email[0] }}
                </div>
            </div>
            <div class="form-floating mb-4 w-2/3 mx-auto">
                <input type="password" 
                    class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300" 
                    :class="{
                        'is-invalid': errors.password && errors.password[0],
                        'is-valid': form.password.length >= 8
                    }"
                    id="password" 
                    v-model="form.password" 
                    placeholder="Password" 
                />
                <div
                class="border-2 w-full h-4 mt-2 bg-slate-400 opacity-40 rounded-lg"
                :class="{
                    'is-valid-text-1': form.password.length >= 1 && form.password.length <= 3,
                    'is-valid-text-3': form.password.length >= 3 && form.password.length <= 5,
                    'is-valid-text-5': form.password.length >= 5 && form.password.length <= 8,
                    'is-valid-upper': /^(?=.*[A-Z])/.test(form.password),
                    'is-valid-num': /^(?=.*\d).+$/.test(form.password),
                    'is-valid-no-safe': form.password.length >= 8 ||  /^(?=.*[A-Z])/.test(form.password) || /^(?=.*\d).+$/.test(form.password),
                    'is-valid-safe': form.password.length >= 8 &&  /^(?=.*[A-Z])(?=.*\d).+$/.test(form.password)
                }">

                </div>
                <label for="password">パスワード(※大文字含む英数字8文字以上)</label>
                <!-- <p class="text-red-500">※大文字含む英数字8文字以上</p> -->
                <div class="invalid-feedback" v-if="errors.password && errors.password[0]">
                    {{ errors.password && errors.password[0] }}
                </div>
            </div>
            <div class="form-floating mb-12 w-2/3 mx-auto">
                <input type="password" class="form-control focus:border-pink-500  focus:ring-2 focus:ring-pink-300" id="password_confirmation" v-model="form.password_confirmation"
                    placeholder="Password Confirmation" />
                <label for="password_confirmation">パスワード(再確認)</label>
            </div>

            <div class="flex justify-center pb-14">
                <button class="w-32 h-14 text-center flex items-center justify-center text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-lg text-2xl" type="submit">登録</button>
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
const { handleRegister } = store

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const handleSubmit = async () => {
    await handleRegister(form)
    if (isLoggedIn.value) {
        router.push({ name: 'recipes' })
    }
}
</script>

<style scoped>
.is-valid {
    border: 1px solid #34D399; /* 緑色のボーダー */
    /* 有効なパスワードを示すためのその他のスタイルを追加 */
}

.is-valid-text-1 {
    opacity: .7;
    width: 15%;
    background-color: #ec4e4e;
    border-radius: 8px;
}
.is-valid-text-3 {
    opacity: .7;
    width: 30%;
    background-color: #ec4e83;
    border-radius: 8px;
}
.is-valid-text-5 {
    opacity: .7;
    width: 60%;
    background-color: #5e4eec;
    border-radius: 8px;
}
.is-valid-upper {
    opacity: .7;
    background-color: #6b4eec;
    border-radius: 8px;
}
.is-valid-num {
    opacity: .7;
    background-color: #984eec;
    border-radius: 8px;
}
.is-valid-no-safe {
    opacity: .7;
    width: 90%;
    background-color: rgb(255, 160, 18);
    border-radius: 8px;
}

.is-valid-safe {
    opacity: .7;
    width: 100%;
    background-color: #34D399;
    border-radius: 8px;
}
</style>