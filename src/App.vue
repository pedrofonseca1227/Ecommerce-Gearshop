<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import './assets/main.css'
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>
