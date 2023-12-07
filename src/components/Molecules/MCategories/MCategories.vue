<script setup lang="ts">
import { watch } from 'vue'
import {
	VCard,
	VIcon
} from 'vuetify/components'

import {
	mdiPlus
} from '@mdi/js'

import { useWalletStore } from '../../../stores/wallet'
import type { CATEGORY_TYPES_COSTS, ICategory } from '../../types'

import type { IABlurProps } from './'

const props = withDefaults(
	defineProps<{
		data: ICategory[]
		// radiusSize?: IABlurProps['radiusSize']
  }>(),
	{
		//
	}
)

const emit = defineEmits<{
  (e: 'category', value: CATEGORY_TYPES_COSTS): void
}>()

const walletStore = useWalletStore()

const onCategorySelect = (category: ICategory): void => {
	walletStore.setSelectedCategory(category)
	emit('category', category)
}

const onAddCategory = () => {
	//
}

const categoryColor = (item) => {
	return item.type === walletStore.cost.selectedCategory.type
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
		<VCard
			v-for="item in data"
			:key="item.type"
			:color="categoryColor(item)"
			class="m-categories-item"
			dark
			ripple
			@click="onCategorySelect(item)"
		>
			{{ item.label }}
		</VCard>
		<!-- <VCard -->
			<!-- class="m-categories-item" -->
			<!-- dark -->
			<!-- ripple -->
			<!-- @click="onAddCategory()" -->
		<!-- > -->
			<!-- <VIcon -->
				<!-- :icon="mdiPlus" -->
				<!-- size="x-large" -->
			<!-- /> -->
		<!-- </VCard> -->
	</div>
</template>

<style scoped>
	.m-categories {
		@apply
			grid
			grid-cols-2
			gap-2

			md:grid-cols-3
			lg:grid-cols-4
		;

		&-item {
			@apply
				min-w-24
				max-w-36

				flex
				items-center
				justify-center

				rounded-lg

				text-sm
				break-normal
				p-2
				leading-4
			;
			aspect-ratio: 1;
		}
	}
</style>
