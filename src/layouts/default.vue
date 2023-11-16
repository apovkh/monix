<script setup lang="ts">
import {
	ABlur,
	E_ABLUR_BACKGROUND,
	LFooter,
	LHeader,
	LMain
} from '../components'
</script>

<template>
  <div class="t-overlay" />
  <div class="l-wrapper">
    <LHeader />
    <LMain>
      <ABlur
        radius-size="xl"
        :background="E_ABLUR_BACKGROUND.Dark"
        class="h-full"
      >
        <slot />
      </ABlur>
    </LMain>

    <LFooter />
  </div>
</template>

<style lang="scss">
  .t-overlay {
    @apply
      absolute
      inset-0
      overflow-hidden
      pointer-events-none
      -z-1
    ;

    &::before,
    &::after {
      content: '';
      @apply
        absolute
        w-[60vw]
        h-[80vw]
        max-h-[50vh]
        max-w-[50vh]
        -z-1
        pointer-events-none

      ;
      filter: blur(130px);
    }

    &::before {
      background-color: #E7B262;
      @apply
        top-0
        -left-5
      ;
    }

    &::after {
      background-color: #88B4B3;
      @apply
        -bottom-2
        -right-5
      ;
    }
  }
  .l-wrapper {
    @apply
      grid
      grid-cols-[100%]
      min-h-[100vh]
    ;

    grid-template-rows: auto 1fr auto;
  }
</style>
