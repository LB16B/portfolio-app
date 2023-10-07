import NewManualPage from '../pages/Manuals/NewManualPage.vue'
import EditManualPage from '../pages/Manuals/EditManualPage.vue'

const manualRoutes = [
    {
        path: "/new_manual/:recipeId",
        component: NewManualPage,
        name: "new_manual",
        meta: {
            auth: true
        }
    },
    {
        path: "/edit_manual/:recipeId",
        component: EditManualPage,
        name: "edit_manual",
        meta: {
            auth: true
        }
    },
];

export default manualRoutes;