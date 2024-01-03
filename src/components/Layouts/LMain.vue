<script setup lang="ts">
import LBox from './LBox.vue'
</script>

<template>
  <main class="l-main">
    <LBox class="h-full">
      <slot />
    </LBox>
  </main>
</template>

<style scoped>
  .l-main {
    //
  }
</style>
