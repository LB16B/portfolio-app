<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'
// import Cropper from "./components/Cropper";

</script>

<template>
  <Navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      
    </transition>
  </router-view>
  <Footer />
</template>

<style scoped>

</style>
