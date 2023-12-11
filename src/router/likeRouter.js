import LikesPage from '../pages/Likes/LikesPage.vue'
import LikeActionsPage from '../pages/Likes/LikeActionsPage.vue'

const likeRoutes = [
    {
        path: "/likes",
        component: LikesPage,
        name: "likes",
        meta: {
            auth: true
        }
    },
    {
        path: "/like_actions",
        component: LikeActionsPage,
        name: "like_actions",
        meta: {
            auth: true
        }
    },
];

export default likeRoutes;