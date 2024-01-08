<script setup lang="ts">
import { VDialog } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import type { IADialogPropsTypes } from './'

const props = withDefaults(
	defineProps<IADialogPropsTypes>(),
	{
		transition: 'dialog-bottom-transition',
		width: 'auto'
	}
)

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue')
</script>

<template>
	<VDialog
		v-model="proxiedModelValue"
		:width="width"
		:transition="transition"
		class="a-dialog"
  >
		<slot />
  </VDialog>
</template>

<style lang="scss">
	.a-dialog {
		&.v-overlay {
			@apply
			'!bg-transparent'
				bg-opacity-5
				opacity-100
			;
			backdrop-filter: blur(10px);

			&__scrim {
				@apply
					'!bg-transparent'
				;
			}
		}
	}
</style>
