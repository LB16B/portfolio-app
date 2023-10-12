import { ref } from 'vue';
import { defineStore } from 'pinia';
import cookies from "js-cookie";
import { csrfCookie } from "../http/auth-api";
import { userProfile } from "../http/userprofile-api"

export const useUserProfileStore = defineStore('userProfile', () => {
    const name = ref('');
    const email = ref('');

    const updateProfile = async (user) => {
        await csrfCookie();
        try {
            await userProfile({
                name: user.name,
                email: user.email
            });
            console.log('成功');
        } catch (error) {
            console.error('APIリクエストエラー', error);
        }
    }

    return {
        name,
        email,
        updateProfile
    }
});