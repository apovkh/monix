<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

import { useWalletStore } from '../../stores/wallet'
ChartJS.register(ArcElement, Tooltip, Legend)
const wallerStore = useWalletStore()

const data = {
	labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
	datasets: [
		{
			backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
			data: [40, 20, 80, 10]
		}
	]
}

const options = {
	responsive: true,
	maintainAspectRatio: false
}
</script>

<template>
   <Doughnut :data="data" :options="options" />
</template>

<style scoped>

</style>
