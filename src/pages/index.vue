<script setup lang="ts">
import { VBtn, VIcon, VTooltip } from 'vuetify/components'

import {
	mdiCommentProcessingOutline,
	mdiDeleteEmpty
} from '@mdi/js'

import {
	AChart,
	ATable,
	ODialogCost,
	ODialogIncome
} from '../components'

import { useIndexPageData } from './handlers'

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
} = useIndexPageData()
</script>

<template>
  <div class="p-main">
		<ul
			v-if="isDataTableView"
			class="c-list"
		>
			<li
				v-for="item in filteredBalance"
        :key="item.id"
				:class="[
					'c-list-item',
					{ 'has-income': item.income },
				]"
			>
				<VIcon
					:icon="item.icon"
					class="mr-[10vw]"
				/>

				<div class="mr-auto leading-4">
					<span class="font-bold">
						{{ item.amount }} <small>UAH</small>
					</span> <br/>
					<small class="opacity-50">{{ item.date }}</small>
				</div>

				<VTooltip
					v-if="item.comment"
					:text="item.comment"
				>
					<template v-slot:activator="{ props }">
						<VIcon
							v-bind="props"
							:icon="mdiCommentProcessingOutline"
						/>
					</template>
				</VTooltip>

				<VBtn
					class="ml-[5vw]"
					variant="text"
					@click="onRemoveBalanceItem(item.id)"
				>
					<VIcon
						color="red"
						:icon="mdiDeleteEmpty"
					/>
				</VBtn>
			</li>
		</ul>
<!--  -->
    <!-- <ATable -->
      <!-- v-if="isDataTableView" -->
      <!-- :data="filteredBalance" -->
      <!-- :title="dataTitle" -->
			<!-- :subtitle="dataSubtitle" -->
			<!-- @remove-balance-item="onRemoveBalanceItem" -->
    <!-- /> -->

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

.c-list {
	@apply
		list-none
	;

	&-item {
		border-left: 4px solid transparent;
		border-bottom: 1px solid #fff1;

		@apply
			p-2
			py-3
			pl-4
			flex
			items-center
			justify-between
			border-l-red
		;

		&.has-income {
			@apply
				border-l-green
			;
		}
	}
}
</style>
