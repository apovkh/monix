<script setup lang="ts">
import { VRadioGroup, VSwitch } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import { useCategory } from '../../../composables/useCategory'
import { useFiltersStore } from '../../../stores/filters'
import {
	CATEGORY_TYPES_COSTS,
	CATEGORY_TYPES_INCOME,
	DATE_TYPES
} from '../../../types'
import { ADrawer } from '../../'

const props = withDefaults(
	defineProps<{
		modelValue: boolean
  }>(),
	{}
)

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
				color="success"
				inset
				/>

				<VSwitch
				v-model="filtersStore.filters.costs"
				label="Витрати"
				density="compact"
				color="success"
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
				>
					<VRadio
						:key="filter.value"
						:label="filter.label"
						:value="filter.value"
						color="success"
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
