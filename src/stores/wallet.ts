import { defineStore } from 'pinia'

import {
	mdiChartArc,
	mdiFormatListBulleted
} from '@mdi/js'

import { CChart, CTable } from '../components'
import type { IBalanceItem } from '../types/index'

export const useWalletStore = defineStore('wallet', {
	state: () => ({
		balance: [] as IBalanceItem[],
		navigations: [
			{
				icon: mdiFormatListBulleted,
				active: true,
				value: 1,
				component: CTable
			},
			{
				icon: mdiChartArc,
				active: false,
				value: 2,
				component: CChart
			}
		]
	}),
	actions: {
		changeBalance (value: IBalanceItem) {
			this.balance.unshift(value)
		},
		removeBalance (id: IBalanceItem['id']) {
			this.balance.splice(
				this.balance.findIndex(item => item.id === id),
				1
			)
		}
	},
	getters: {
		totalBalance (state) {
			if (state?.balance?.length) {
				return state.balance.reduce((acc, item) => {
					return acc + Number(item.amount)
				}, 0)
			}
			return 0
		}
	}
})
