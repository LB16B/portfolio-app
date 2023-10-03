import ReviewsPage from '../pages/Reviews/ReviewsPage.vue'
import NewReviewPage from '../pages/Reviews/NewReviewPage.vue'

const reviewRoutes = [
    {
        path: "/reviews",
        component: ReviewsPage,
        name: 'reviews',
        meta: {
            auth: true
        }
    },
    {
        path: "/new_review/:recipeId",
        component: NewReviewPage,
        name: 'new_review',
        meta: {
            auth: true
        }
    },
];

export default reviewRoutes;