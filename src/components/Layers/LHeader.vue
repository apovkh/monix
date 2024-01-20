<script setup lang="ts">
import { VBtn } from 'vuetify/components'

import { mdiFilterOutline, mdiMenu } from '@mdi/js'

import { ABlur } from '../'

import type { ILHeaderPropsTypes } from './LayersTypes'
import LBox from './LBox.vue'

defineProps<ILHeaderPropsTypes>()

const emit = defineEmits<{
  (e: 'click-menu', value: MouseEvent): void
  (e: 'click-filter', value: MouseEvent): void
}>()

const onMenuCLick = (e: MouseEvent): void => {
	emit('click-menu', e)
}

const onFilterCLick = (e: MouseEvent): void => {
	emit('click-filter', e)
}
</script>

<template>
  <header class="l-header">
    <LBox>
      <ABlur>
        <div class="l-header-inner">
          <VBtn
            :icon="mdiMenu"
            class="mr-auto"
            color="primary"
            @click="onMenuCLick"
          />

          <div class="mr-auto text-2xl text-center">
            <div class="text-xs">Загальний баланс</div>
            <div class="text-2xl transform font-bold">
              {{ balance }}
            </div>
          </div>

          <VBtn
            :icon="mdiFilterOutline"
            color="primary"
            @click="onFilterCLick"
          />
        </div>
      </ABlur>
    </LBox>
  </header>
</template>

<style lang="scss">
  .l-header {
    @apply
      sticky
      inset-3
      mb-6

      z-1000
    ;

    &-inner {
      @apply
        flex
        items-center
        gap-1
      ;
    }
  }
</style>
