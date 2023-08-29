import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

// defineStore ストアを定義するためのファクトリ関数
// 第一引数 ストアの名前 第二引数 ストアの定義
export const useAuthStore = defineStore("authStore", ()=> {
    const user = ref(null)

    const isLoggedIn = computed(() => !!user.value)

    // 非同期通信でサーバーからユーザーデータを取得
    const fetchUser = async () => {
        const { data } = await getUser()
        user.value = data
    }

    const handleLogin = async (credentials) => {
        await csrfCookie()
        await login(credentials)
        await fetchUser()
    }

    const handleRegister = async (newUser) => {
        await register(newUser)
        await handleLogin({
            email: newUser.email,
            password: newUser.password
        })
    }

    const handleLogout = async () => {
        await logout(
            user.value = null
        )
    }

    return {
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleRegister,
        handleLogout
    }
})
