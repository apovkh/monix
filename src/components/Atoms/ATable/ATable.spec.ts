import { describe, expect, it } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import { ATable } from '.'

describe('ATable', () => {
	it('renders properly with default props', () => {
		const wrapper = shallowMount(ATable, {
			props: {
				data: [],
				title: 'title'
			}
		})

		expect(wrapper.exists()).toBe(true)
		expect(wrapper.props('title')).toBe('title')
	})
})
