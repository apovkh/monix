<script setup lang="ts">
import LBox from './LBox.vue'
</script>

<template>
  <header class="l-header">
    <LBox>
    </LBox>
  </header>
</template>

<style scoped>
  .l-header {
    @apply
      flex
      items-center
      shadow
      shadow-sm
      py-2
    ;
  }
</style>
