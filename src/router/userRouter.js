import ChangePasswordPage from '../pages/Users/ChangePasswordPage.vue'

const userRoutes = [
    {
        path: "/users",
        component: ChangePasswordPage,
        name: "change_password",
        meta: {
            auth: true
        }
    }
];

export default userRoutes;