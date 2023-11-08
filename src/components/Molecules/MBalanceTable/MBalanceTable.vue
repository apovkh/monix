<script setup lang="ts">
import { useWalletStore } from '../../../stores/wallet'
import { ATable } from '../../'

const wallerStore = useWalletStore()
</script>

<template>
  <ATable
    :data="wallerStore.balance"
    title="List"
  />
</template>

<style scoped>

</style>
