import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import { ABlur } from './'

describe('ABlur', () => {
	it('renders properly', () => {
		const wrapper = shallowMount(ABlur)
		expect(wrapper.exists()).toBe(true)
	})

	it('applies default props', () => {
		const wrapper = shallowMount(ABlur)
		expect(wrapper.vm.radiusSize).toBe('full')
		expect(wrapper.vm.background).toBe('light')
	})

	it('applies custom props', () => {
		const wrapper = shallowMount(ABlur, {
			props: {
				radiusSize: 'medium',
				background: 'dark'
			}
		})

		expect(wrapper.vm.radiusSize).toBe('medium')
		expect(wrapper.vm.background).toBe('dark')
	})
})
