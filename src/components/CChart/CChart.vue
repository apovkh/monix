<script setup lang="ts">
import { computed } from 'vue'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

import { useCategory } from '../../composables/useCategory'
import { useWalletStore } from '../../stores/wallet'
ChartJS.register(ArcElement, Tooltip, Legend)

const wallerStore = useWalletStore()
const categoryComposable = useCategory()

const existCatgories = computed(() => {
	if (wallerStore.balance.length) {
		return [...new Set(wallerStore.balance.map(item => item?.type.name))]
	} return []
})

const balanceCount = computed(() => {
	return existCatgories.value.map(item => {
		return wallerStore.balance.filter(i => i.type.name === item)
			.reduce((acc, bal) => {
				return acc + Math.abs(bal.amount)
			}, 0)
	})
})

const chartData = computed(() => {
	return {
		labels: existCatgories.value,
		datasets: [
			{
				backgroundColor: existCatgories.value
					.map((costs) => {
						return categoryComposable.value[costs].color
					}),
				data: balanceCount.value
			}
		]
	}
})

const displayChart = computed(() => {
	return !!balanceCount.value.reduce((acc, i) => acc + i, 0)
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
