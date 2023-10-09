import { ref } from 'vue';
import { defineStore } from 'pinia';
import { changePassword } from '../http/changepassword-api';
import { useRouter } from 'vue-router';

export const useChangePasswordStore = defineStore('changePassword', () => {
    const router = useRouter();

    const current_password = ref('');
    const new_password = ref('');
    const new_confirm_password = ref('');

    const performChangePassword = async () => {
    try {
            if ( new_password !== new_confirm_password) {
                console.error('新しいパスワードと確認用パスワードが一致しません。');
                return;
            }

            const response = await changePassword(new_password, new_confirm_password);
        } catch (error) {
            console.error('API リクエストエラー ', error);
        }
};

    return {
        current_password,
        new_password,
        new_confirm_password,
        performChangePassword,
    };
});
