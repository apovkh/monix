<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import { LBox, LSection } from '../../../components'
import type { IBalanceItem } from '../../../types'

const props = withDefaults(
	defineProps<{
		title: string
		chartData: any
		categories: IBalanceItem[] | []
	}>(),
	{}
)

ChartJS.register(ArcElement, Tooltip, Legend)

const balanceCount = computed((): number[] | [] => {
	return props.categories.map((item: IBalanceItem) => {
		return Math.abs(Number(item.amount))
	})
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
	<LSection
		:title="title"
		:subtitle="!displayChart ? 'Дані відсутні' : undefined"
	>
		<LBox>
			<Doughnut
				:data="chartData"
				:options="options"
			/>
		</LBox>
	</LSection>
</template>

<style scoped lang="scss">
//
</style>
