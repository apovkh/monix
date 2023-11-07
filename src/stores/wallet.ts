import Localbase from 'localbase'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import {
	mdiHandCoinOutline
} from '@mdi/js'
import { useDateFormat, useNow } from '@vueuse/core'

import {
	CATEGORY_TYPES_INCOME,
	type IBalanceItem,
	type ICategory
} from '../types'
import Localbase from '../utils/localbase/index'

const db = new Localbase('monix')

const db = new Localbase('db')

export const useWalletStore = defineStore('wallet', {
	state: () => ({
		balance: [] as IBalanceItem[],
		amount: null as number | null,
		date: useDateFormat(useNow().value, 'YYYY-MM-DD').value,
		cost: {
			isOpenDialog: false as boolean,
			selectedCategory: {} as ICategory,
			comment: '' as IBalanceItem['comment'],
			label: '' as IBalanceItem['label']
		},
		income: {
			isOpenDialog: false as boolean,
			comment: '' as IBalanceItem['comment'],
			label: '' as IBalanceItem['label']
		}
	}),
	actions: {
		addCost () {
			const cost = {
				costs: true,
				date: this.date,
				category: this.cost.selectedCategory.category,
				label: this.cost.selectedCategory.label,
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
			this.amount = null
		},
		resetIncomeData () {
			this.income.isOpenDialog = false
			this.income.comment = ''
			this.amount = null
		},
		addIcome () {
			const income = {
				income: true,
				date: this.date,
				category: CATEGORY_TYPES_INCOME.Income,
				label: 'Надходження',
				icon: mdiHandCoinOutline,
				amount: this.amount,
				comment: this.income.comment,
				id: uuidv4()
			} as IBalanceItem

			this.balance.unshift(income)

			db.collection('balance').add(income)
			this.resetIncomeData()
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
		totalBalance (state): number {
			if (state?.balance?.length) {
				return +state.balance.reduce((acc, item) => {
					return acc + Number(item.amount)
				}, 0).toFixed(2)
			}
			return 0
		}
	}
})
