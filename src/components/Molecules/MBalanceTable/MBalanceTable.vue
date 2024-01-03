<script setup lang="ts">
import { useWalletStore } from '../../../stores/wallet'
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
