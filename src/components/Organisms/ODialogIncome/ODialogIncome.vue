<script setup lang="ts">
import { VTextarea } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import { useWalletStore } from '../../../stores/wallet'
import { ADialog } from '../../'
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

const walletStore = useWalletStore()

const onClickAddCost = (): void => {
	walletStore.addIcome()
}
</script>

<template>
	<ADialog
		v-model="proxiedModelValue"
		transition="dialog-bottom-transition"
		width="500"
		:class="[
			'o-dialog-income',
		]"
	>
		<div class="o-dialog-income-inner">
			<VTextarea
				v-model="walletStore.income.comment"
				label="Коментар до надходження"
				auto-grow
				variant="outlined"
				class="o-dialog-income-comment"
				rows="1"
				row-height="15"
			/>

			<VBtn
				class="o-dialog-income-button"
				color="orange"
				size="large"
				@click="onClickAddCost"
			>
				<span class="text-sm">
					Додати надходження
				</span>
			</VBtn>
		</div>
	</ADialog>
</template>

<style scoped>
	.o-dialog-income {
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
				p-8
				rounded-3xl
				font-semibold

				md:p-10
			;
		}
	}
</style>
