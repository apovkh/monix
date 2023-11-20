<script setup lang="ts">
import { computed } from 'vue'

import { useWalletStore } from '../../../stores/wallet'
import { CATEGORY_TYPES_INCOME } from '../../../types/index'
import { ATable } from '../../'

const walletStore = useWalletStore()
</script>

<template>
  <ATable
    :data="walletStore.balance"
    title="Список витрат/прибутків"
  />
</template>

<style scoped>

</style>
