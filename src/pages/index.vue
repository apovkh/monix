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
	existCatgories,
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
			@remove-balance-item="onRemoveBalanceItem"
    />

    <AChart
			v-if="isDataChartView"
			:title="dataTitle"
			:categories="existCatgories"
			:chart-data="chartData"
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
