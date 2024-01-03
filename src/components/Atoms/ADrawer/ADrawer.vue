<script setup lang="ts">
import { ref } from 'vue'
import { VBtn, VLayout, VNavigationDrawer } from 'vuetify/components'

import { mdiClose } from '@mdi/js'
import { useVModel } from '@vueuse/core'

import type { IADrawerPropsTypes } from './'

const props = withDefaults(
	defineProps<IADrawerPropsTypes>(),
	{
		location: 'start' as IADrawerPropsTypes['location']
	}
)

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue')
const onCloseClick = (): void => {
	proxiedModelValue.value = false
}
</script>

<template>
	<VLayout>
		<VNavigationDrawer
			v-model="proxiedModelValue"
			temporary
			:location="location"
			class="a-drawer"
		>
			<header class="a-drawer-header">
				<VBtn
					:icon="mdiClose"
					variant="plain"
					@click="onCloseClick"
				/>
			</header>
			<main class="a-drawer-inner">
				<slot />
			</main>

		</VNavigationDrawer>
	</VLayout>
</template>

<style scoped lang="scss">
	.a-drawer {
		&-header {
			@apply
				p-1
				text-right
			;
		}

		&-inner {
			@apply
				p-4
				pt-0
			;
		}
	}

	.v-navigation-drawer__scrim {
		@apply
		bg-black
			bg-opacity-5
			opacity-100
		;
		backdrop-filter: blur(10px);
	}
</style>
