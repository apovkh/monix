<script setup lang="ts">
import type { IABlurProps } from './'

withDefaults(
	defineProps<IABlurProps>(),
	{
		radiusSize: 'full',
		background: 'light' as IABlurProps['background']
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

<style lang="scss">
	.a-blur {
		@apply
			relative
			overflow-hidden
			p-3
		;

		backdrop-filter: blur(100px);

		&::before {
		content: '';
			@apply
				absolute
				inset-0
				inherit
				opacity-10
				-z-1
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
