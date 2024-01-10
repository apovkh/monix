<script setup lang="ts">
import { VBtn } from 'vuetify/components'

import { useVModel } from '@vueuse/core'

import type { DATA_SCREEN_VIEW } from '../../../types'
import { ADrawer } from '../../'

import type { IODrawerMenuPropsTypes } from './'

const props = defineProps<IODrawerMenuPropsTypes>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click-view', value: DATA_SCREEN_VIEW): void
}>()

const proxiedModelValue = useVModel(props, 'modelValue', emit)

const onClickView = (view: DATA_SCREEN_VIEW): void => {
	emit('click-view', view)
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
				v-for="item in data"
				:key="item.value"
			>
				<div class="o-drawer-menu__group-item">
					<VBtn
						class="w-full"
						:variant="view === item.value
							? 'flat'
							: 'text'
						"
						:color="view === item.value
							? 'green'
							: 'text'
						"
						:prepend-icon="item.icon"
						@click="onClickView(item.value)"
					>
						{{ item.label }}
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
