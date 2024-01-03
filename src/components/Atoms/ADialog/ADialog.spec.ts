import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import { ADialog } from '.'

describe('ADialog', () => {
	it('renders properly', () => {
		const wrapper = shallowMount(ADialog, {
			props: {
				modelValue: false
			}
		})

		expect(wrapper.exists()).toBe(true)
	})

	it('opens dialog when modelValue is true', async () => {
		const wrapper = shallowMount(ADialog, {
			props: {
				modelValue: true
			}
		})

		await wrapper.vm.$nextTick()
		expect(wrapper.props('modelValue')).toBe(true)
	})

	it('closes dialog when modelValue is false', async () => {
		const wrapper = shallowMount(ADialog, {
			props: {
				modelValue: true
			}
		})

		await wrapper.setProps({ modelValue: false })
		await wrapper.vm.$nextTick()
		expect(wrapper.props('modelValue')).toBe(false)
	})
})
