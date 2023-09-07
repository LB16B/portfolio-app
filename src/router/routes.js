import RecipesPage from '../pages/recipes/RecipesPage.vue';
import NewRecipePage from '../pages/recipes/NewRecipePage.vue';
import MyRecipesPage from '../pages/recipes/MyRecipesPage.vue';
import ShowRecipePage from '../pages/recipes/ShowRecipePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import SummaryPage from '../pages/SummaryPage.vue';
import NotFoundErrorPage from '../pages/errors/NotFoundErrorPage.vue';
import HomePage from '../pages/HomePage.vue'


const routes = [
    {
        path: "/",
        component: HomePage,
        name: 'home',
    },
    {
        path: "/recipes",
        component: RecipesPage,
        name: 'recipes',
        meta: {
            auth: true
        }
    },
    {
        path: "/show_recipe/:recipeId",
        component: ShowRecipePage,
        name: 'show_recipe',
        meta: {
            auth: true
        }
    },
    {
        path: "/my_recipes",
        component: MyRecipesPage,
        name: 'my_recipes',
        meta: {
            auth: true
        }
    },
    {
        path: "/new_recipe",
        component: NewRecipePage,
        name: 'new_recipe',
        meta: {
            auth: true
        }
    },
    {
        path: "/summary",
        component: SummaryPage,
        name: 'summary',
        meta: {
            auth: true
        }
    },
    {
        path: "/login",
        component: LoginPage,
        name: 'login',
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        component: RegisterPage,
        name: 'register',
        meta: {
            guest: true
        }
    },
    {
        path: "/:notFound(.*)",
        name: 'error.404',
        component: NotFoundErrorPage,
    },
];

export default routes