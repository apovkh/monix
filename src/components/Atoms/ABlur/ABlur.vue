<script setup lang="ts">
import { computed, ref } from 'vue'

import type { IABlurProps } from './'
import { E_ABLUR_BACKGROUND } from './'

const props = withDefaults(
	defineProps<{
		radiusSize?: IABlurProps['radiusSize']
		background?: IABlurProps['background']
  }>(),
	{
		radiusSize: 'full',
		background: E_ABLUR_BACKGROUND.Light
	}
)
</script>

<template>
	<div
		:class="[
			'a-blur',
			`rounded-${radiusSize}`,
			`a-blut-t-${background}`,
		]"
	>
		<slot />
	</div>
</template>

<style scoped>
	.a-blur {
		@apply
			relative
			overflow-hidden
			p-3
		;

		backdrop-filter: blur(0px);

		&::before {
		content: '';
			@apply
				absolute
				inset-0
				inherit
				opacity-10
			;
		}

		&.a-blut-t {
			&-light::before {
				@apply
					bg-white
				;
			}

			&-dark::before {
				@apply
					bg-dark-800
					opacity-50
				;
			}
		}
	}
</style>
