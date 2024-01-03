import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import {
	mdiChartArc,
	mdiFormatListBulleted,
	mdiHandCoinOutline
} from '@mdi/js'
import { useDateFormat, useNow } from '@vueuse/core'

import { AChart, MBalanceTable, MIncomeTable } from '../components'
import type { IBalanceItem, ICategory, INavigationItem } from '../types/index'
import Localbase from '../utils/localbase/index'

const db = new Localbase('monix')

export const useWalletStore = defineStore('wallet', {
	state: () => ({
		balance: [] as IBalanceItem[],
		amount: 0 as number,
		cost: {
			isOpenDialog: false as boolean,
			selectedCategory: {} as ICategory,
			comment: '' as IBalanceItem['comment']
		},
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
		addCost () {
			const cost = {
				income: false,
				date: useDateFormat(useNow().value, 'YYYY-MM-DD').value,
				type: this.cost.selectedCategory.type,
				icon: this.cost.selectedCategory.icon,
				amount: `-${this.amount}`,
				comment: this.cost.comment,
				id: uuidv4()
			} as IBalanceItem

			this.balance.unshift(cost)

			db.collection('balance').add(cost)
			this.resetCostData()
		},
		setSelectedCategory (data: ICategory) {
			this.$state.cost.selectedCategory = data
		},
		resetCostData () {
			this.cost.isOpenDialog = false
			this.cost.selectedCategory = {} as ICategory
			this.cost.comment = ''
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
