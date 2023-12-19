import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'

import { AChart } from '.'

describe('AChart', () => {
	it('renders properly with default props', async () => {
		const title = 'title'
		const chartData = { labels: [], datasets: [] }
		const categories = []
		const wrapper = mount(AChart, {
			props: { title, chartData, categories }
		})

		expect(wrapper.exists()).toBeTruthy()
	})

	it('displays title when no data is available', async () => {
		const title = 'Title'
		const chartData = { labels: [], datasets: [] }
		const categories = []

		const wrapper = mount(AChart, {
			props: {
				title,
				chartData,
				categories
			}
		})

		await wrapper.vm.$nextTick()

		expect(wrapper.props('title')).toBe('Title')
	})

	it('displays chart when data is available', async () => {
		const title = 'title'
		const chartData = {
			labels: ['Category 1', 'Category 2'], datasets: [{ data: [50, 30] }]
		}
		const categories = [{ amount: 50 }, { amount: -30 }]

		const wrapper = mount(AChart, {
			props: { title, chartData, categories }
		})

		await wrapper.vm.$nextTick()

		expect(wrapper.find('canvas').exists()).toBeTruthy()
	})
})
