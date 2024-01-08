<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { VBtn } from 'vuetify/components'

import { mdiFilterOutline, mdiMenu } from '@mdi/js'

import { useWalletStore } from '../../stores/wallet'
import { ABlur } from '../'

import LBox from './LBox.vue'

const emit = defineEmits<{
  (e: 'menu:click', value: MouseEvent): void
  (e: 'filter:click', value: MouseEvent): void
}>()

const walletStore = useWalletStore()

const formatBalance = computed<string>(() => walletStore.totalBalance
	.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))

const onMenuCLick = (e): void => {
	emit('menu:click', e)
}

const onFilterCLick = (e): void => {
	emit('filter:click', e)
}

onMounted(async () => {
	await walletStore.getBalance()
})
</script>

<template>
  <header class="l-header">
    <LBox>
      <ABlur>
        <div class="l-header-inner">
          <VBtn
            :icon="mdiMenu"
            class="mr-auto"
            @click="onMenuCLick"
          />

          <div class="mr-auto text-2xl text-center">
            <div class="text-xs">Загальний баланс</div>
            <div class="text-2xl transform font-bold">
              {{ formatBalance }}
            </div>
          </div>

          <VBtn
            :icon="mdiFilterOutline"
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
