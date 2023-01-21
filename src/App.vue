<script setup>
import TheHeader from "./TheHeader.vue";
</script>

<template>
  <div class="app">
    <div class="header">
      <TheHeader></TheHeader>
    </div>

    <div class="body mx-8">
      <div class="p-0 mb-5 flex justify-content-center"><RouterView /></div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<style scoped>
.body {
  margin-top: 8rem;
}
</style>
