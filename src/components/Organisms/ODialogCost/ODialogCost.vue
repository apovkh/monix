<script setup lang="ts">
import { VDialog, VTextarea } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import { useCategory } from '../../../composables/useCategory'
import { useWalletStore } from '../../../stores/wallet'
import type { ICategory } from '../../../types'
import { MCategories } from '../../'

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

const categories = useCategory()
const walletStore = useWalletStore()

const onClickAddCost = (): void => {
	walletStore.addCost()
}

const onSelectCategory = (category: ICategory): void => {
	walletStore.cost.selectedCategory = category
}
</script>

<template>
	<VDialog
		v-model="proxiedModelValue"
		transition="dialog-bottom-transition"
		width="auto"
		:class="[
			'o-dialog-cost',
		]"
	>
		<div class="o-dialog-cost-inner">
			<h3 class="o-dialog-cost-title">Оберіть категорію</h3>

			<VTextarea
				v-model="walletStore.cost.comment"
				label="Коментар до витрати"
				auto-grow
				variant="outlined"
				class="o-dialog-cost-comment"
				rows="1"
				row-height="15"
			/>

			<MCategories
				:data="Object.values(categories)"
				class="o-dialog-cost-categories"
				@category="onSelectCategory"
			/>
			<VBtn
				class="o-dialog-cost-button"
				color="orange"
				size="large"
				:disabled="!walletStore.cost.selectedCategory.category"
				@click="onClickAddCost"
			>
				<span class="text-sm">
					Додати витрату
				</span>
			</VBtn>
		</div>
	</VDialog>
</template>

<style scoped>
	.o-dialog-cost {
		&-title {
			@apply
				mb-8
				text-2xl
			;
		}

		&-comment {
			@apply
				mb-0
			;
		}

		&-categories {
			@apply
				mb-8
			;
		}

		&-button {
			@apply
				w-full
				font-bold
			;
		}

		&-inner {
			@apply
				bg-black
				p-6
				rounded-3xl
				font-semibold
				w-[100vw]
				max-w-[600px]
				іь:p-8
				md:p-10
				<sm:max-w-[90vw]
			;
		}
	}
</style>
