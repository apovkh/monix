<script setup lang="ts">
import LBox from './LBox.vue'
</script>

<template>
  <main class="l-main">
    <slot />
  </main>
</template>

<style scoped>
  .l-main {
    @apply
      my-4
    ;
  }
</style>
