<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
	VBtn,
	VIcon,
	VTab,
	VTabs,
	VWindow,
	VWindowItem
} from 'vuetify/components'

import {
	mdiFood,
	mdiMinus,
	mdiPlus
} from '@mdi/js'

import { CDialog } from '../components'
import { useWalletStore } from '../stores/wallet'

const wallerStore = useWalletStore()
const navigation = ref(null)
const isOpenDialog = ref<boolean>(false)
const isIncrease = ref<boolean>(false)

const onChangeBalanceClick = (increase: boolean): void => {
	isIncrease.value = increase
	isOpenDialog.value = true
}
</script>

<template>
  <div class="p-main">
    <div class="main">
      <div class="bg-indigo p-4">

        <h2 class="text-4xl text-center mb-4 title-1">Balance</h2>
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
            <b class="text-3xl mr-2">{{ wallerStore.totalBalance }}</b>
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

      </div>
    </div>

    <div class="flex-grow-1 overflow-auto">
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

    <div class="tabs shadow shadow-sm shadow-light-500">
      <VTabs
        v-model="navigation"
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

  <CDialog
    v-model="isOpenDialog"
    :increase="isIncrease"
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
