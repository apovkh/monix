<script setup lang="ts">
import { VRadioGroup, VSwitch } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import { useFiltersStore } from '../../../stores/filters'
import { ADrawer } from '../../'

import type { IODrawerFilterPropsTypes } from './'

const props = defineProps<IODrawerFilterPropsTypes>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue')

const filtersStore = useFiltersStore()
</script>

<template>
	<ADrawer
		v-model="proxiedModelValue"
		location="right"
		:class="[
			'o-drawer-filter',
			$attrs.class
		]"
  >
		<div class="o-drawer-filter__group">
			<!-- replace on dynamic render -->
			<VSwitch
				v-model="filtersStore.filters.income"
				label="Надходження"
				density="compact"
				hide-details
				color="primary"
				inset
				/>

				<VSwitch
				v-model="filtersStore.filters.costs"
				label="Витрати"
				density="compact"
				color="primary"
				hide-details
				inset
			/>
		</div>

		<div class="o-drawer-filter__group">
			<template
				v-for="filter in filtersStore.dateFiltersData"
				:key="filter.value"
			>
				<VRadioGroup
					v-model="filtersStore.filters.date"
					density="compact"
					:hide-details="true"
				>
					<VRadio
						:key="filter.value"
						:label="filter.label"
						:value="filter.value"
						color="primary"
						class="mb-4"
					/>
				</VRadioGroup>
			</template>
		</div>
  </ADrawer>
</template>

<style lang="scss">
	.o-drawer-filter {
		&__group {
			@apply
				not-last:mb-6
			;
		}

		.v-input__details {
			@apply
				'!hidden'
			;
		}
	}
</style>
