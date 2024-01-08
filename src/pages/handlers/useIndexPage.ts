import { computed, onMounted } from 'vue'
import type { ComputedRef } from 'vue'

import type { IADialogPropsTypes, LSectionPropsTypes } from '../../components'
import { useCategory } from '../../composables/useCategory'
import { useFiltersStore, useMenuStore, useWalletStore } from '../../stores'
import { DATA_SCREEN_VIEW, type IBalanceItem } from '../../types'

export class IndexPage {
	public readonly chartData: any
	public readonly isOpenCostDialog: ComputedRef<
		IADialogPropsTypes['modelValue']
	>

	public readonly isOpenIncomeDialog: ComputedRef<
		IADialogPropsTypes['modelValue']
	>

	public readonly dataTitle: ComputedRef<LSectionPropsTypes['title']>
	public readonly dataSubtitle: ComputedRef<LSectionPropsTypes['subtitle']>
	public readonly isDataChartView: ComputedRef<boolean>
	public readonly isDataTableView: ComputedRef<boolean>
	public readonly filteredBalance: ComputedRef<IBalanceItem[] | []>

	private readonly balanceCount: ComputedRef<number[]>
	private readonly existCatgories: ComputedRef<IBalanceItem[] | []>

	private readonly menuStore: ReturnType<typeof useMenuStore>
	private readonly walletStore: ReturnType<typeof useWalletStore>
	private readonly filtersStore: ReturnType<typeof useFiltersStore>

	private readonly categoryComposable: ReturnType<typeof useCategory>

	constructor () {
		this.menuStore = useMenuStore()
		this.walletStore = useWalletStore()
		this.filtersStore = useFiltersStore()

		this.categoryComposable = useCategory()

		this.dataTitle = computed(() => {
			const label = this.filtersStore!.dateFiltersData.find(item => {
				return item.value === this.filtersStore.filters.date!
			})!.label.toLowerCase()

			return this.filtersStore.filters.costs ||
				this.filtersStore.filters.income
				? `Період (${label}): ${this.filtersStore.balance}`
				: ''
		})

		this.existCatgories = computed(() => {
			const groupedData = {} as any

			this.filtersStore.filteredBalance.forEach(item => {
				item.amount = Number(item.amount)

				const categoryName = item.category

				if (groupedData[categoryName]) {
					groupedData[categoryName].amount += item.amount
				} else {
					groupedData[categoryName] = {
						category: {
							label: item.label,
							name: categoryName,
							icon: item.icon
						},
						amount: item.amount,
						date: item.date,
						id: item.id
					}
				}
			})

			return Object.values(groupedData)
		})

		this.isDataChartView = computed(() => {
			return this.menuStore.view === DATA_SCREEN_VIEW.Chart &&
				!!this.balanceCount.value.reduce((acc, i) => acc + i, 0)
		})

		this.isDataTableView = computed(() => {
			return this.menuStore.view === DATA_SCREEN_VIEW.Table
	 	})

		this.balanceCount = computed(() => {
			return this.existCatgories.value.map(item => {
				return Math.abs(Number(item.amount))
			})
		})

		this.chartData = computed(() => {
			return {
				labels: this.existCatgories.value.map(item => {
					return item.category.label
				}),
				datasets: [
					{
						backgroundColor: this.existCatgories.value
							.map((item) => {
								return this.categoryComposable.value[
									item.category.name
								].color
							}),
						data: this.balanceCount.value
					}
				]
			}
		})

		this.dataSubtitle = computed(() => {
			return !this.isDataChartView ? 'Дані відсутні' : undefined
		})

		this.filteredBalance = computed(() => this.filtersStore.filteredBalance)

		this.isOpenCostDialog = computed(() => this.walletStore.cost.isOpenDialog)
		this.isOpenIncomeDialog = computed(() => this.walletStore.income.isOpenDialog)

		onMounted(async () => {
			await this.walletStore.getBalance()
		})
	}

	removeBalanceItem (id: IBalanceItem['id']): void {
		this.walletStore.removeBalance(id)
	}
}

export function useIndexPage (): IndexPage {
	return new IndexPage()
}
