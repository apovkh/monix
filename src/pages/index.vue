<script setup lang="ts">
import {
	AChart,
	ATable,
	ODialogCost,
	ODialogIncome
} from '../components'

import { useIndexPage } from './handlers'

// eslint-disable-next-line @typescript-eslint/typedef
const {
	chartData,
	dataTitle,
	dataSubtitle,
	filteredBalance,
	isDataTableView,
	isDataChartView,
	isOpenCostDialog,
	isOpenIncomeDialog,
	removeBalanceItem: onRemoveBalanceItem
} = useIndexPage()
</script>

<template>
  <div class="p-main">
    <ATable
      v-if="isDataTableView"
      :data="filteredBalance"
      :title="dataTitle"
			:subtitle="dataSubtitle"
			@remove-balance-item="onRemoveBalanceItem"
    />

		<AChart
			v-if="isDataChartView"
			:chart-data="chartData"
			:title="dataTitle"
			:subtitle="dataSubtitle"
		/>
  </div>

  <ODialogCost v-model="isOpenCostDialog" />
  <ODialogIncome v-model="isOpenIncomeDialog" />
</template>

<style lang="scss">
.p-main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
