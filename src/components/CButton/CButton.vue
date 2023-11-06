<script setup lang="ts">
import { VBtn } from 'vuetify/components'

defineProps<{
  text: string
}>()
</script>

<template>
  <div>
    <VBtn>
      {{ text }}
    </VBtn>
  </div>
</template>

<style scoped>

</style>
