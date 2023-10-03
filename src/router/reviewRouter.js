import ReviewsPage from '../pages/Reviews/ReviewsPage.vue'

const reviewRoutes = [
    {
        path: "/reviews",
        component: ReviewsPage,
        name: 'reviews',
        meta: {
            auth: true
        }
    },
];

export default reviewRoutes;