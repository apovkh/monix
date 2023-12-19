import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import { ADrawer } from '.'

describe('ADrawer', () => {
	it('renders properly with default props', () => {
		const wrapper = shallowMount(ADrawer)
		expect(wrapper.exists()).toBe(true)
	})

	it('renders properly with specified location prop', () => {
		const wrapper = shallowMount(ADrawer as any, {
			props: {
				modelValue: false,
				location: 'end'
			}
		})

		expect(wrapper.exists()).toBe(true)
		expect(wrapper.props('location')).toBe('end')
	})

	it('emits update:modelValue event when the drawer is closed', async () => {
		const wrapper = shallowMount(ADrawer as any, {
			props: {
				modelValue: true
			}
		})

		await wrapper.vm.$nextTick()

		expect(wrapper.props('modelValue')).toBeTruthy()
	})
})
