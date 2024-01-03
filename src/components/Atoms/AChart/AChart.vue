<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'
import {
	VSelect
} from 'vuetify/components'

import { LBox, LSection } from '../../../components'
import { useCategory } from '../../../composables/useCategory'
import { useWalletStore } from '../../../stores/wallet'
import { DATE_TYPES } from '../../../types/'
import { filterByDate } from '../../../utils/dataFilter'

ChartJS.register(ArcElement, Tooltip, Legend)

const walletStore = useWalletStore()
const categoryComposable = useCategory()
const filterDate = ref(null)

const existCatgories = computed(() => {
	const groupedData = {}

	walletStore.balance.forEach(item => {
		item.amount = Number(item.amount)

		const typeName = item.type.name

		if (groupedData[typeName]) {
			groupedData[typeName].amount += item.amount
		} else {
			groupedData[typeName] = {
				type: {
					name: typeName,
					icon: item.type.icon
				},
				amount: item.amount,
				date: item.date
			}
		}
	})
	const result = Object.values(groupedData)
	if (filterDate.value) {
		return filterByDate(result, filterDate.value.value)
	}

	return result
})

const balanceCount = computed(() => {
	return existCatgories.value.map(item => {
		return Math.abs(Number(item.amount))
	})
})

const chartData = computed(() => {
	return {
		labels: existCatgories.value.map(item => item.type.name),
		datasets: [
			{
				backgroundColor: existCatgories.value
					.map((item) => {
						return categoryComposable.value[item.type.name].color
					}),
				data: balanceCount.value
			}
		]
	}
})

const displayChart = computed(() => {
	return !!balanceCount.value.reduce((acc, i) => acc + i, 0)
})

const timeFilterData = ref([
	{
		label: 'Сьогодні',
		value: DATE_TYPES.Today
	},
	{
		label: 'Вчора',
		value: DATE_TYPES.Yesterday
	},
	{
		label: 'Тиждень',
		value: DATE_TYPES.Week
	},
	{
		label: 'Місяць',
		value: DATE_TYPES.Month
	},
	{
		label: 'Рік',
		value: DATE_TYPES.Year
	},
	{
		label: 'Весь час',
		value: DATE_TYPES.FullTime
	}
])

const options = {
	responsive: true,
	maintainAspectRatio: false
}
</script>

<template>
	<LSection
		title="Графік витрат"
		:subtitle="!displayChart ? 'Дані відсутні' : undefined"
	>
		<LBox>
			<VSelect
				v-model="filterDate"
				label="Фільтр за датою"
				item-title="label"
				return-object
				class="max-w-md"
				:items="timeFilterData"
			/>
			<div>
				<Doughnut
					:data="chartData"
					:options="options"
				/>
			</div>
		</LBox>
	</LSection>
</template>

<style scoped>

</style>
