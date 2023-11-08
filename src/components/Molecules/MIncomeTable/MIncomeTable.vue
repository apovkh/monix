<script setup lang="ts">
import { computed } from 'vue'

import { useWalletStore } from '../../../stores/wallet'
import { CATEGORY_TYPES_INCOME } from '../../../types/index'
import { ATable } from '../../'

const wallerStore = useWalletStore()
const incomeData = computed(() => wallerStore.balance
	.filter(item => item.type.name === CATEGORY_TYPES_INCOME.Income))
</script>

<template>
  <ATable
		:data="incomeData"
		title="Income list"
	/>
</template>

<style scoped>

</style>
