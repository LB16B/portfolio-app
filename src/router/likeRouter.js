import LikesPage from '../pages/Likes/LikesPage.vue'

const likeRoutes = [
    {
        path: "/likes",
        component: LikesPage,
        name: "likes",
        meta: {
            auth: true
        }
    }
];

export default likeRoutes;