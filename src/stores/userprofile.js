import { ref } from 'vue';
import { defineStore } from 'pinia';
import cookies from "js-cookie";
import { csrfCookie } from "../http/auth-api";
import { userProfile, allUsers } from "../http/userprofile-api"

export const useUserProfileStore = defineStore('userProfile', () => {
    const users = ref([])
    const name = ref('');
    const email = ref('');

    const fetchAllUsers = async () => {
        const { data } = await allUsers();
        users.value = data.data;
    }


    const updateProfile = async (user) => {
        await csrfCookie();
        try {
            await userProfile({
                name: user.name,
                email: user.email,
                filename: user.filename
            });
            console.log('成功');
        } catch (error) {
            console.error('APIリクエストエラー', error);
        }
    }

    return {
        name,
        email,
        users,
        updateProfile,
        fetchAllUsers
    }
});