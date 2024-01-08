<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

import { LBox, LSection } from '../../../components'
import type { IBalanceItem } from '../../../types'

import type { IAChartPropsTypes } from './'

defineProps<IAChartPropsTypes>()

ChartJS.register(ArcElement, Tooltip, Legend)
</script>

<template>
	<LSection
		:title="title"
		:subtitle="subtitle"
	>
		<LBox>
			<Doughnut
				:data="chartData"
				:options="{
					responsive: true,
					maintainAspectRatio: false
				}"
			/>
		</LBox>
	</LSection>
</template>

<style lang="scss">
//
</style>
