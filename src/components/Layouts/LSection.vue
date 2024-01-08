<script setup lang="ts">
import { LBox } from './'

defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <section
    class="l-section"
  >
    <LBox class="l-section__heading">
      <h3
        v-if="title"
        class="l-section__heading-title"
      >
        {{ title }}
      </h3>
      <div
        v-if="subtitle"
        class="l-section__heading-subtitle"
      >
        {{ subtitle }}
      </div>
    </LBox>

    <slot />
  </section>
</template>

<style lang="scss">
  .l-section {
    @apply
      mb-6
      md:mb-12
    ;

    &__heading {
      @apply
        my-5
      ;

      &-title {
        @apply
          font-black
          '!leading-tight'
          mb-2
        ;
      }

      &-subtitle {
        @apply
          opacity-50
          mb-10
        ;
      }
    }
  }
</style>
