<script setup lang="ts">
import {
	VBtn,
	VTextField
} from 'vuetify/components'

import {
	mdiMinus,
	mdiPlus
} from '@mdi/js'
import { useVModel } from '@vueuse/core'

import { ABlur } from '../'

import type { ILFooterPropsTypes } from './LayersTypes'
import { LBox } from './'

const props = defineProps<ILFooterPropsTypes>()

const emit = defineEmits<{
  (e: 'click-income', value: MouseEvent): void
  (e: 'click-cost', value: MouseEvent): void
  (e: 'update:amount', value: number | null): void
}>()

const proxiedModelValueAmount = useVModel(props, 'amount', emit)

const onClickIncome = (e: MouseEvent): void => {
	emit('click-income', e)
}

const onClickAddCost = (e: MouseEvent): void => {
	emit('click-cost', e)
}
</script>

<template>
  <footer class="l-footer">
    <LBox>
      <ABlur>
        <div class="l-footer-inner">
          <VBtn
            size="x-large"
            color="green"
            :icon="mdiPlus"
            @click="onClickIncome"
            >
          </VBtn>

          <VTextField
            v-model="proxiedModelValueAmount"
            label="Сума"
            type="number"
            rounded
            variant="outlined"
            :hide-details="true"
            validate-on="blur"
            :error="isErrorAmount"
          />

          <VBtn
            size="x-large"
            class="px-0"
            color="red"
            :icon="mdiMinus"
            @click="onClickAddCost"
          />
        </div>
      </ABlur>
    </LBox>
  </footer>
</template>

<style lang="scss">
  .l-footer {
    @apply
      sticky
      inset-3

      mt-3
      mb-3

      z-1000
    ;

    &-inner {
      @apply
        flex
        justify-between
        items-center
        rounded-full

        gap-3
      ;
    }
  }
</style>
