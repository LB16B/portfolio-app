import SearchRecipePage from '../pages/recipes/SearchRecipePage.vue'
import SearchCategoryRecipePage from '../pages/recipes/SearchCategoryRecipePage.vue'

const recipeRoutes = [
    {
        path: "/search_recipe/:searchWord",
        component: SearchRecipePage,
        name: "search_recipe",
        meta: {
            auth: true
        }
    },
    {
        path: "/search_category_recipe/:ageId/:foodId",
        component: SearchCategoryRecipePage,
        name: "search_category_recipe",
        meta: {
            auth: true
        }
    },
];

export default recipeRoutes;