<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
	VIcon,
	VTab,
	VTabs,
	VWindow,
	VWindowItem
} from 'vuetify/components'

import { ADialog } from '../components'
import { useWalletStore } from '../stores/wallet'

const wallerStore = useWalletStore()
const navigation = ref(null)
const isIncome = ref<boolean>(false)

onMounted(async () => {
	await wallerStore.getBalance()
})
</script>

<template>
  <div class="p-main">
    <div class="flex-grow-1 relative">
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
    v-model="wallerStore.isOpenDialog"
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
