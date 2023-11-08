<script setup lang="ts">
</script>

<template>
  <div class="l-wrapper">
    <header class="l-header">
    </header>

    <main class="l-main h-full flex">
        <slot />
    </main>

    <footer class="l-footer">
    </footer>
  </div>
</template>

<style lang="scss">
  .l-wrapper {
    @apply
      grid
      grid-cols-[100%]
      min-h-[100vh]
    ;

    grid-template-rows: auto 1fr auto;
  }
</style>
