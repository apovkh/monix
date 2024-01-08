<script setup lang="ts">
import {
	VCard
} from 'vuetify/components'

import { useWalletStore } from '../../../stores/wallet'
import type { CATEGORY_TYPES_COSTS, ICategory } from '../../types'

import type { IMCategoryPropsTypes } from './'

defineProps<IMCategoryPropsTypes>()

const emit = defineEmits<{
  (e: 'category', value: CATEGORY_TYPES_COSTS): void
}>()

const walletStore = useWalletStore()

const onCategorySelect = (category: IMCategoryPropsTypes['data']): void => {
	walletStore.setSelectedCategory(category)
	emit('category', category)
}

const categoryColor = (item: IMCategoryPropsTypes['data']): string => {
	return item.category === walletStore.cost.selectedCategory.category
		? item.color
		: ''
}
</script>

<template>
	<div
		:class="[
			'm-categories',
		]"
	>
		<template
			v-for="item in data"
			:key="item.type"
		>
		<VCard
			v-if="item.category"
			:color="categoryColor(item)"
			class="m-categories-item"
			dark
			ripple
			@click="onCategorySelect(item)"
		>
			{{ item.label }}
		</VCard>
	</template>
	</div>
</template>

<style lang="scss">
	.m-categories {
		@apply
			grid
			grid-cols-3
			gap-2

			sm:grid-cols-4
		;

		&-item {
			@apply
				min-w-20
				max-w-36

				flex
				items-center
				justify-center

				rounded-lg

				text-sm
				break-normal
				p-2
				leading-4

				lg:min-w-26
			;
			aspect-ratio: 1;
		}
	}
</style>
