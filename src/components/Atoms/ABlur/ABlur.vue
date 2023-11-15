<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
	defineProps<{
		paddingSize?: number
		radiusSize?: string
  }>(),
	{
		paddingSize: 3,
		radiusSize: 'full'
	}
)
</script>

<template>
	<div
		:class="[
			'a-blur',
			`p-${paddingSize}`,
			`rounded-${radiusSize}`
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
		;

		backdrop-filter: blur(0px);

		&::before {
		content: '';
			@apply
				absolute
				inset-0
				bg-white
				opacity-10
			;
		}
	}
</style>
