<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
	VBtn,
	VTextField
} from 'vuetify/components'

import {
	mdiMinus,
	mdiPlus
} from '@mdi/js'

import { useWalletStore } from '../../stores/wallet'
import { ABlur } from '../'

import { LBox } from './'

const wallerStore = useWalletStore()

const amount = ref<number>()
const isError = ref<boolean>(false)

const onChangeBalanceClick = (income: boolean): void => {
	if (!amount.value || amount.value < 0) {
		isError.value = true
		return
	}
	isError.value = false

	wallerStore.selectBalanceData()
//
}

const formatBalance = computed<string>(() => wallerStore.totalBalance
	.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))

watch(amount, (value) => {
	if (value && value > 0) {
		isError.value = false
	} else {
		isError.value = true
	}
})

onMounted(async () => {
	await wallerStore.getBalance()
})
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
            @click="onChangeBalanceClick(true)"
            >
          </VBtn>

          <VTextField
            v-model="amount"
            label="Сума"
            type="number"
            variant="outlined"
            :hide-details="true"
            :error="isError"
          />

          <VBtn
            size="x-large"
            class="px-0"
            color="orange"
            :icon="mdiMinus"
            @click="onChangeBalanceClick(false)"
          />
        </div>
      </ABlur>
    </LBox>
  </footer>
</template>

<style scoped>
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
