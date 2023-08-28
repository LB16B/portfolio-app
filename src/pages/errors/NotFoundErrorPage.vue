<template>
    <div class="container">
        <h1>404</h1>
        <p>Sorry, the page <code>{{ $route.params.notFound }}</code> you're looking for is not found</p>
        <router-link :to="{ name: 'recipes' }" class="text-blue-600">Back to your recipes</router-link>
    </div>
</template>