import RecipesPage from '../pages/RecipesPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import SummaryPage from '../pages/SummaryPage.vue';

const routes = [
    {
        path: "/recipes",
        component: RecipesPage,
        name: 'recipes',
    },
    {
        path: "/summary",
        component: SummaryPage,
        name: 'summary',
    },
    {
        path: "/login",
        component: LoginPage,
        name: 'login',
    },
    {
        path: "/register",
        component: RegisterPage,
        name: 'register',
    },
];

export default routes