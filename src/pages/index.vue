<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import {
	AChart,
	ATable,
	ODialogCost,
	ODialogIncome
} from '../components'
import { useCategory } from '../composables/useCategory'
import { useFiltersStore, useMenuStore, useWalletStore } from '../stores'
import { DATA_SCREEN_VIEW } from '../types'

const menuStore = useMenuStore()
const walletStore = useWalletStore()
const filtersStore = useFiltersStore()

const tableTitle = computed<string>(() => {
	const label = filtersStore.dateFiltersData.find(item => {
		return item.value === filtersStore.filters.date!
	}).label.toLowerCase()

	if (filtersStore.filters.costs || filtersStore.filters.income) {
		return `Таблиця ${filtersStore.filters.costs
			? 'витрат'
			: ''
		}${(filtersStore.filters.costs && filtersStore.filters.income)
			? ' та '
			: ''}${filtersStore.filters.income
			? 'надходжень'
			: ''
		} за ${label} : ${filtersStore.balance}`
	}
	return ''
})
onMounted(async () => {
	await walletStore.getBalance()
})
const onRemoveBalanceItem = (id): void => {
	walletStore.removeBalance(id)
}

const chartTitle = computed<string>(() => {
	const label = filtersStore.dateFiltersData.find(item => {
		return item.value === filtersStore.filters.date!
	}).label.toLowerCase()
	return `Графік витрат за ${label}: ${filtersStore.balance}`
})

const categoryComposable = useCategory()

const existCatgories = computed(() => {
	const groupedData = {}

	filtersStore.filteredBalance.forEach(item => {
		item.amount = Number(item.amount)

		const categoryName = item.category

		if (groupedData[categoryName]) {
			groupedData[categoryName].amount += item.amount
		} else {
			groupedData[categoryName] = {
				category: {
					label: item.label,
					name: categoryName,
					icon: item.icon
				},
				amount: item.amount,
				date: item.date
			}
		}
	})
	const result = Object.values(groupedData)

	return result
})

const balanceCount = computed(() => {
	return existCatgories.value.map(item => {
		return Math.abs(Number(item.amount))
	})
})

const chartData = computed(() => {
	return {
		labels: existCatgories.value.map(item => item.category.label),
		datasets: [
			{
				backgroundColor: existCatgories.value
					.map((item) => {
						return categoryComposable.value[item.category.name].color
					}),
				data: balanceCount.value
			}
		]
	}
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

  <ODialogCost v-model="walletStore.cost.isOpenDialog" />
  <ODialogIncome v-model="walletStore.income.isOpenDialog" />
</template>

<style lang="scss">
.p-main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
