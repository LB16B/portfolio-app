import { ref } from 'vue';
import { defineStore } from 'pinia';
import cookies from "js-cookie";
import { changePassword } from '../http/changepassword-api';
import { csrfCookie } from "../http/auth-api";;

export const useChangePasswordStore = defineStore('changePassword', () => {

    const current_password = ref('');
    const new_password = ref('');
    const new_password_confirmation = ref('');

    const performChangePassword = async (user) => {
        await csrfCookie();
    try {
        await changePassword({
            current_password: user.current_password,
            new_password: user.new_password,
            new_password_confirmation: user.new_password_confirmation
        });
        console.log('成功')

        } catch (error) {
            console.error('API リクエストエラー ', error);
        }
};

    return {
        current_password,
        new_password,
        new_password_confirmation,
        performChangePassword,
    };
});
