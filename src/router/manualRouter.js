import NewManualPage from '../pages/Manuals/NewManualPage.vue'

const manualRoutes = [
    {
        path: "/new_manual/:recipeId",
        component: NewManualPage,
        name: "new_manual",
        meta: {
            auth: true
        }
    },
];

export default manualRoutes;