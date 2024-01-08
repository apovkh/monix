import { computed, onMounted } from 'vue'
import type { ComputedRef } from 'vue'

import { useCategory } from '../../composables/useCategory'
import { useFiltersStore, useMenuStore, useWalletStore } from '../../stores'
import { DATA_SCREEN_VIEW, type IBalanceItem } from '../../types'

export class IndexPage {
	public readonly chartData: any
	public readonly isOpenCostDialog: boolean
	public readonly isOpenIncomeDialog: boolean
	public readonly dataTitle: ComputedRef<string>
	public readonly isDataChartView: ComputedRef<boolean>
	public readonly isDataTableView: ComputedRef<boolean>
	public readonly existCatgories: ComputedRef<IBalanceItem[] | []>
	public readonly filteredBalance: IBalanceItem[] | []

	private readonly balanceCount: ComputedRef<number[]>

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

			console.log('groupedData: ', groupedData)

			return Object.values(groupedData)
		})

		this.isDataChartView = computed(() => {
			return this.menuStore.view === DATA_SCREEN_VIEW.Chart
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

		this.filteredBalance = this.filtersStore.filteredBalance
		this.isOpenCostDialog = this.walletStore.cost.isOpenDialog
		this.isOpenIncomeDialog = this.walletStore.income.isOpenDialog

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
