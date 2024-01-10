import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
	DATE_TYPES,
	type IBalanceItem
} from '../types'
import { filterByDate } from '../utils/dataFilter'

import { useWalletStore } from './wallet'

export interface IFilterStoreState {
	walletStore: ReturnType<typeof useWalletStore>
	filters: {
		income: boolean
		costs: boolean
		date: DATE_TYPES
	}
	dateFiltersData: {
		label: string
		value: DATE_TYPES
	}[]
}

export const useFiltersStore = defineStore('filters', {
	state: (): IFilterStoreState => ({
		walletStore: useWalletStore(),
		filters: {
			income: true,
			costs: true,
			date: DATE_TYPES.Month
		},
		dateFiltersData: [
			{
				label: 'Сьогодні',
				value: DATE_TYPES.Today
			},
			{
				label: 'Вчора',
				value: DATE_TYPES.Yesterday
			},
			{
				label: 'Тиждень',
				value: DATE_TYPES.Week
			},
			{
				label: 'Місяць',
				value: DATE_TYPES.Month
			},
			{
				label: 'Рік',
				value: DATE_TYPES.Year
			},
			{
				label: 'Весь час',
				value: DATE_TYPES.FullTime
			}
		]
	}),
	actions: {
		//
	},
	getters: {
		balance (): number | string {
			if (this.filteredBalance.length) {
				const balance = +this.filteredBalance.reduce((acc, item) => {
					return acc + Number(item.amount)
				}, 0).toFixed(2)
				return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			}
			return 0
		},
		filteredBalance (state): IBalanceItem[] {
			const result = ref<IBalanceItem[]>([])
			const balance = state.walletStore.balance

			if (balance.length) {
				result.value = filterByDate(
					balance, state.filters.date
				)
					.filter(item => {
						return (
							state.filters.income ? item.income : undefined
						) || (
							state.filters.costs ? item.costs : undefined
						)
					})
			}

			return result.value
		}
	}
})
