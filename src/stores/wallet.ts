import { defineStore } from 'pinia'

import {
	mdiChartArc,
	mdiFormatListBulleted,
	mdiHandCoinOutline
} from '@mdi/js'

import { AChart } from '../components'
import { MBalanceTable, MIncomeTable } from '../components/Molecules'
import type { IBalanceItem, INavigationItem } from '../types/index'
import Localbase from '../utils/localbase/index'

const db = new Localbase('monix')

export const useWalletStore = defineStore('wallet', {
	state: () => ({
		balance: [] as IBalanceItem[],
		navigations: [
			{
				icon: mdiFormatListBulleted,
				active: true,
				value: 1,
				component: MBalanceTable
			},
			{
				icon: mdiHandCoinOutline,
				active: false,
				value: 2,
				component: MIncomeTable
			},
			{
				icon: mdiChartArc,
				active: false,
				value: 3,
				component: AChart
			}
		] as INavigationItem[]
	}),
	actions: {
		changeBalance (balanceItem: IBalanceItem) {
			db.collection('balance').add(balanceItem)
			this.balance.unshift(balanceItem)
		},
		removeBalance (id: IBalanceItem['id']) {
			db.collection('balance').doc({ id }).delete()

			this.balance.splice(
				this.balance.findIndex(item => item.id === id),
				1
			)
		},
		async getBalance () {
			try {
				const dbBalance = await db.collection('balance').get()
				this.balance = dbBalance
			} catch (err) {
				console.error('error db getBalance: ', err)
			}
		}
	},
	getters: {
		totalBalance (state) {
			if (state?.balance?.length) {
				return state.balance.reduce((acc, item) => {
					return acc + Number(item.amount)
				}, 0).toFixed(2)
			}
			return 0
		}
	}
})
