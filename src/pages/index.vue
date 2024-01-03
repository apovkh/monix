<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
	VIcon,
	VTab,
	VTabs,
	VWindow,
	VWindowItem
} from 'vuetify/components'

import { ATable, ODialogCost, ODialogIncome } from '../components'
import { useWalletStore } from '../stores/wallet'

const walletStore = useWalletStore()
const navigation = ref(null)

onMounted(async () => {
	await walletStore.getBalance()
})
</script>

<template>
  <div class="p-main">
    <ATable
      :data="walletStore.balance"
      title="Список витрат/прибутків"
    />
    <!-- <div class="flex-grow-1 relative"> -->
      <!-- <VWindow v-model="navigation"> -->
        <!-- <VWindowItem -->
          <!-- v-for="nav in walletStore.navigations" -->
          <!-- :key="nav.value" -->
          <!-- :value="nav.value" -->
        <!-- > -->
          <!-- <Component :is="nav.component" /> -->
        <!-- </VWindowItem> -->
      <!-- </VWindow> -->
    <!-- </div> -->

    <!-- <div class="tabs shadow shadow-sm shadow-light-500"> -->
      <!-- <VTabs -->
        <!-- v-model="navigation" -->
        <!-- bg-color="indigo" -->
        <!-- grow -->
      <!-- > -->
        <!-- <VTab -->
          <!-- v-for="nav in walletStore.navigations" -->
          <!-- :key="nav.value" -->
          <!-- :value="nav.value" -->
        <!-- > -->
          <!-- <VIcon :icon="nav.icon" /> -->
        <!-- </VTab> -->
      <!-- </VTabs> -->
    <!-- </div> -->

  </div>
  <ODialogCost v-model="walletStore.cost.isOpenDialog" />
  <ODialogIncome v-model="walletStore.income.isOpenDialog" />

  <!-- <ADialog -->
    <!-- v-model="walletStore.isOpenDialog" -->
    <!-- :income="isIncome" -->
  <!-- /> -->
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
