<script setup lang="ts">
import { LBox, LHeader, LMain } from '../components/Layouts'
</script>

<template>
  <div class="l-wrapper">
    <header class="l-header">
      <!-- <LBox> -->
        <!-- <LHeader /> -->
      <!-- </LBox> -->
    </header>

    <main class="l-main">
      <LBox class="h-full flex">
        <slot />
      </LBox>
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
