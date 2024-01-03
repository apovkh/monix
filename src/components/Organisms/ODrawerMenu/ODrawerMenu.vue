<script setup lang="ts">
import { VBtn } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import { useMenuStore } from '../../../stores/menu'
import type { DATA_SCREEN_VIEW } from '../../../types'
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

const menuStore = useMenuStore()

const onClickView = (view: DATA_SCREEN_VIEW): void => {
	menuStore.setView(view)
	proxiedModelValue.value = false
}
</script>

<template>
	<ADrawer
		v-model="proxiedModelValue"
		location="left"
		:class="[
			'o-drawer-menu',
			$attrs.class
		]"
  >
	<div class="o-drawer-menu__group">
			<h3 class="o-drawer-menu__group-title">Вигляд</h3>
			<template
				v-for="view in menuStore.viewData"
				:key="view.value"
			>
				<div class="o-drawer-menu__group-item">
					<VBtn
						class="w-full"
						:variant="menuStore.view === view.value
							? 'flat'
							: 'text'
						"
						:color="menuStore.view === view.value
							? 'green'
							: 'text'
						"
						:prepend-icon="view.icon"
						@click="onClickView(view.value)"
					>
						{{ view.label }}
					</VBtn>
				</div>
			</template>
		</div>
  </ADrawer>
</template>

<style lang="scss">
	.o-drawer-menu {
		&__group {
			@apply
				not-last:mb-6
			;

			&-title {
				@apply
					mb-4
				;
			}

			&-item {
				@apply
					mb-2
				;
			}
		}
	}
</style>
