import { defineStore } from 'pinia'

import { mdiChartArc, mdiTableLarge } from '@mdi/js'

import type { IODrawerMenuPropsTypes } from '../components'
import { DATA_SCREEN_VIEW } from '../types'

export interface IMenuStoreState {
	view: DATA_SCREEN_VIEW
	viewData: IODrawerMenuPropsTypes['data']
}

export const useMenuStore = defineStore('menu', {
	state: (): IMenuStoreState => ({
		view: DATA_SCREEN_VIEW.Table,
		viewData: [
			{
				label: 'Таблиця',
				value: DATA_SCREEN_VIEW.Table,
				icon: mdiTableLarge
			},
			{
				label: 'Графік',
				value: DATA_SCREEN_VIEW.Chart,
				icon: mdiChartArc
			}
		]
	}),
	actions: {
		setView (view: DATA_SCREEN_VIEW): void {
			this.view = view
		}
	},
	getters: {
		//
	}
})
