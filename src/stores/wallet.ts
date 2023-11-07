import Localbase from 'localbase'
import { defineStore } from 'pinia'

import {
	mdiChartArc,
	mdiFormatListBulleted
} from '@mdi/js'

import { CChart, CTable } from '../components'
import type { IBalanceItem } from '../types/index'

const db = new Localbase('db')

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
				}, 0)
			}
			return 0
		}
	}
})
