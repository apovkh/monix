<script setup lang="ts">
import { VDialog } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

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
</script>

<template>
	<VDialog
		v-model="proxiedModelValue"
		width="800"
		class="a-dialog"
  >
		<slot />
  </VDialog>
</template>

<style scoped>
	.a-dialog {
		//
	}
</style>
