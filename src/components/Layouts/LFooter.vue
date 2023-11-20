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

const isError = ref<boolean>(false)

const validAmount = () => {
	if (!wallerStore.amount || wallerStore.amount < 0) {
		isError.value = true
		return false
	}
	isError.value = false
	return true
}

const onClickIncome = () => {
	if (validAmount()) {
		//
	}
}

const onClickAddCost = () => {
	if (validAmount()) {
		wallerStore.cost.isOpenDialog = true
	}
}

watch(wallerStore.amount, (value) => {
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
            @click="onClickIncome"
            >
          </VBtn>

          <VTextField
            v-model="wallerStore.amount"
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
            @click="onClickAddCost"
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
