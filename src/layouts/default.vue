<script setup lang="ts">
import { ref } from 'vue'

import {
	ABlur,
	ADrawer,
	LFooter,
	LHeader,
	LMain
} from '../components'
const isOpenMenuDrawer = ref(false)
const isOpenFiltersDrawer = ref(false)

const onHeaderMenuClick = (): void => {
	isOpenMenuDrawer.value = !isOpenMenuDrawer.value
}

const onFilterMenuClick = (): void => {
	isOpenFiltersDrawer.value = !isOpenFiltersDrawer.value
}
</script>

<template>
  <div class="t-overlay" />
  <div class="l-wrapper">
    <LHeader
      @menu:click="onHeaderMenuClick"
      @filter:click="onFilterMenuClick"
    />
    <LMain>
      <ABlur
        radius-size="xl"
        background="dark"
        class="h-full"
      >
        <slot />
      </ABlur>
    </LMain>

    <LFooter />
  </div>

  <ADrawer
    v-model="isOpenMenuDrawer"
  >
    menu
  </ADrawer>

  <ADrawer
    v-model="isOpenFiltersDrawer"
    location="right"
  >
    filters
  </ADrawer>
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
        w-[40vw]
        h-[40vw]
        rounded-1
        -z-1
        pointer-events-none

      ;
      // filter: blur(130px);
    }

    &::before {
      background-color: #E7B262;
      @apply
        top-1
        left-5
      ;
    }

    &::after {
      background-color: #88B4B3;
      @apply
        bottom-20
        right-5
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
