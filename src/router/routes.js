import RecipesPage from '../pages/recipes/RecipesPage.vue';
import NewRecipePage from '../pages/recipes/NewRecipePage.vue';
import MyRecipesPage from '../pages/recipes/MyRecipesPage.vue';
import ShowRecipePage from '../pages/recipes/ShowRecipePage.vue';
import EditRecipePage from '../pages/recipes/EditRecipePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import NotFoundErrorPage from '../pages/errors/NotFoundErrorPage.vue';
import HomePage from '../pages/HomePage.vue'
import NewFoodPage from '../pages/Foods/NewFoodPage.vue'
import EditFoodPage from '../pages/Foods/EditFoodPage.vue';
import likeRoutes from './likeRouter.js';
import reviewRoutes from './reviewRouter.js';
import manualRoutes from './manualRouter.js';
import recipeRoutes from './recipeRouter.js';
import userRoutes from './userRouter.js';
import CategoryFoodRecipesPage from '../pages/recipes/CategoryFoodRecipesPage.vue'

const routes = [
    ...reviewRoutes,
    ...manualRoutes,
    ...likeRoutes,
    ...userRoutes,
    ...recipeRoutes,
    {
        path: "/",
        component: HomePage,
        name: 'home',
    },
    {
        path: "/recipes/:categoryAgeId",
        component: RecipesPage,
        name: 'recipes',
        meta: {
            auth: true
        }
    },
    {
        path: "/recipes/:categoryFoodId",
        component: CategoryFoodRecipesPage,
        name: 'category_food_recipes',
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
        path: "/edit_recipe/:recipeId",
        component: EditRecipePage,
        name: 'edit_recipe',
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
        path: "/new_food/:recipe_id",
        component: NewFoodPage,
        name: 'new_food',
        props: true,
        meta: {
            auth: true
        }
    },
    {
        path: "/edit_food/:recipeId",
        component: EditFoodPage,
        name: 'edit_food',
        props: true,
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