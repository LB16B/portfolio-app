import SearchRecipePage from '../pages/recipes/SearchRecipePage.vue'

const recipeRoutes = [
    {
        path: "/search_recipe/:searchWord",
        component: SearchRecipePage,
        name: "search_recipe",
        meta: {
            auth: true
        }
    },
];

export default recipeRoutes;