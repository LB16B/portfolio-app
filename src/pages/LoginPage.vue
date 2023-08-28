<template>
    <h1>Login</h1>
    <button 
        @click="handleClick"
        class="inline-flex items-center bg-pink-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded mt-4 md:mt-0 text-xl">
            Login
    </button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const handleClick = () => {
    router.push({ name: 'recipes' })
}
</script>