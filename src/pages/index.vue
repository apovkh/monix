<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
	VBtn,
	VIcon,
	VTab,
	VTabs,
	VWindow,
	VWindowItem
} from 'vuetify/components'

import {
	mdiMinus,
	mdiPlus
} from '@mdi/js'

import { ADialog } from '../components'
import { LBox } from '../components/layouts'
import { useWalletStore } from '../stores/wallet'

const wallerStore = useWalletStore()
const navigation = ref(null)
const isOpenDialog = ref<boolean>(false)
const isIncome = ref<boolean>(false)

const onChangeBalanceClick = (income: boolean): void => {
	isIncome.value = income
	isOpenDialog.value = true
}

onMounted(async () => {
	await wallerStore.getBalance()
})
</script>

<template>
  <div class="p-main">
    <div class="main">
      <div class="bg-indigo py-4">
        <LBox>
          <h2 class="text-4xl text-center mb-4 title-1">Баланс</h2>
          <div class="flex gap-2 items-center justify-between">
            <VBtn
              rounded="xl"
              size="x-large"
              color="green"
              @click="onChangeBalanceClick(true)"
            >
              <VIcon
                size="x-large"
                :icon="mdiPlus"
              />
            </VBtn>

            <div>
              <b class="text-xl mr-2">{{ wallerStore.totalBalance }}</b>
              <small class="opacity-50">UAH</small>
            </div>

            <VBtn
              rounded="xl"
              size="x-large"
              class="px-0"
              color="orange"
              @click="onChangeBalanceClick(false)"
            >
              <VIcon
                size="x-large"
                :icon="mdiMinus"
              />
            </VBtn>
          </div>
        </LBox>
      </div>
    </div>

    <div class="flex-grow-1 relative">
      <div class="absolute overflow-y-auto inset-0">
        <VWindow v-model="navigation">
          <VWindowItem
            v-for="nav in wallerStore.navigations"
            :key="nav.value"
            :value="nav.value"
          >
            <Component :is="nav.component" />
          </VWindowItem>
        </VWindow>
      </div>
    </div>

    <div class="tabs shadow shadow-sm shadow-light-500">
      <VTabs
        v-model="navigation"
        bg-color="indigo"
        grow
      >
        <VTab
          v-for="nav in wallerStore.navigations"
          :key="nav.value"
          :value="nav.value"
        >
          <VIcon :icon="nav.icon" />
        </VTab>
      </VTabs>
    </div>

  </div>

  <ADialog
    v-model="isOpenDialog"
    :income="isIncome"
  />
</template>

<style lang="scss">
.c-counter {
  @apply
    flex
    items-center
    align-center
    gap-4
  ;
}

.p-main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
