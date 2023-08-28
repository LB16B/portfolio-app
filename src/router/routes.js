import RecipesPage from '../pages/RecipesPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const routes = [
    {
        path: "/recipes",
        component: RecipesPage,
        name: 'recipes'
    },
    {
        path: "/login",
        component: LoginPage,
        name: 'login'
    },
    {
        path: "/register",
        component: RegisterPage,
        name: 'register'
    },
]

export default routes