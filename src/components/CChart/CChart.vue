<script setup lang="ts">
import { computed } from 'vue'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

import { useCategory } from '../../composables/useCategory'
import { useWalletStore } from '../../stores/wallet'
import { CATEGORY_TYPES_COSTS } from '../../types/index'
ChartJS.register(ArcElement, Tooltip, Legend)

const wallerStore = useWalletStore()
const categoryComposable = useCategory()

const balanceCount = computed(() => {
	return Object.keys(CATEGORY_TYPES_COSTS).map(item => {
		return wallerStore.balance.filter(i => i.type.name === item)
			.reduce((acc, bal) => {
				return acc + Math.abs(bal.amount)
			}, 0)
	})
})

const chartData = computed(() => {
	return {
		labels: Object.values(CATEGORY_TYPES_COSTS),
		datasets: [
			{
				backgroundColor: Object.keys(CATEGORY_TYPES_COSTS)
					.map((costs) => {
						return categoryComposable.value[costs].color
					}),
				data: balanceCount.value
			}
		]
	}
})

const displayChart = computed(() => {
	return !!balanceCount.value.reduce((acc, i) => acc + i)
})

const options = {
	responsive: true,
	maintainAspectRatio: false
}
</script>

<template>
	<div class="text-center p-4">
		<div
			v-if="!displayChart"
			class="text-center"
		>
		Data is empty
	</div>
		<template v-if="displayChart">
			<h1 class="mb-5 text-left text-xl">Costs by chart</h1>
			<div>
				<Doughnut
					:data="chartData"
					:options="options"
				/>
			</div>
		</template>
	</div>
</template>

<style scoped>

</style>
