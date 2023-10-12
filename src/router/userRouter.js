import ChangePasswordPage from '../pages/Users/ChangePasswordPage.vue'
import UserProfilePage from '../pages/Users/UserProfilePage.vue'

const userRoutes = [
    {
        path: "/users",
        component: ChangePasswordPage,
        name: "change_password",
        meta: {
            auth: true
        }
    },
    {
        path: "/user_profile",
        component: UserProfilePage,
        name: "user_profile",
        meta: {
            auth: true
        }
    },
];

export default userRoutes;