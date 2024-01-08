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

const walletStore = useWalletStore()

const isError = ref<boolean>(false)

const validAmount = (): boolean => {
	if (!walletStore.amount || walletStore.amount < 0) {
		isError.value = true
		return false
	}
	isError.value = false
	return true
}

const onClickIncome = (): void => {
	if (validAmount()) {
		walletStore.income.isOpenDialog = true
	}
}

const onClickAddCost = (): void => {
	if (validAmount()) {
		walletStore.cost.isOpenDialog = true
	}
}

watch(walletStore.amount, (value) => {
	if (value && value > 0) {
		isError.value = false
	} else {
		isError.value = true
	}
})

onMounted(async () => {
	await walletStore.getBalance()
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
            @click="onClickIncome"
            >
          </VBtn>

          <VTextField
            v-model="walletStore.amount"
            label="Сума"
            type="number"
            rounded
            variant="outlined"
            :hide-details="true"
            validate-on="blur"
            :error="isError"
          />

          <VBtn
            size="x-large"
            class="px-0"
            color="orange"
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
