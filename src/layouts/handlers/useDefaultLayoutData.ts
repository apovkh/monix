import { computed, onMounted, ref, watch } from 'vue'
import type { ComputedRef, Ref, WritableComputedRef } from 'vue'

import type {
	ILFooterPropsTypes,
	ILHeaderPropsTypes,
	IODrawerFilterPropsTypes,
	IODrawerMenuPropsTypes
} from '../../components'
import {
	type IMenuStoreState,
	useMenuStore,
	useWalletStore
} from '../../stores'

export class DefaultLayoutData {
	public isOpenMenuDrawer: Ref<IODrawerMenuPropsTypes['modelValue']>
	public isOpenFiltersDrawer: Ref<IODrawerFilterPropsTypes['modelValue']>
	public isErrorAmount: Ref<ILFooterPropsTypes['isErrorAmount']>
	public amount: WritableComputedRef<ILFooterPropsTypes['amount']>

	public readonly viewData: IMenuStoreState['viewData']
	public readonly viewDataType: ComputedRef<IMenuStoreState['view']>
	public readonly formatedBalance: ComputedRef<ILHeaderPropsTypes['balance']>

	private walletStore: ReturnType<typeof useWalletStore>
	private menuStore: ReturnType<typeof useMenuStore>

	constructor () {
		this.isOpenMenuDrawer = ref(false)
		this.isOpenFiltersDrawer = ref(false)
		this.isErrorAmount = ref(false)

		this.walletStore = useWalletStore()
		this.menuStore = useMenuStore()

		this.viewData = this.menuStore.viewData

		this.amount = computed({
			get: (): ILFooterPropsTypes['amount'] => {
				return this.walletStore.amount
			},
			set: (value: ILFooterPropsTypes['amount']) => {
				this.walletStore.amount = +value!
			}
		})

		this.viewDataType = computed(() => this.menuStore.view)

		this.formatedBalance = computed(() => this.walletStore.totalBalance
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ','))

		this.headerMenuClick = this.headerMenuClick.bind(this)
		this.filterMenuClick = this.filterMenuClick.bind(this)
		this.validAmount = this.validAmount.bind(this)
		this.changeView = this.changeView.bind(this)
		this.addIncome = this.addIncome.bind(this)
		this.addCost = this.addCost.bind(this)

		watch(this.amount, (value: ILFooterPropsTypes['amount']) => {
			if (value && value > 0) {
				this.isErrorAmount.value = false
			} else {
				this.isErrorAmount.value = true
			}
		})

		onMounted(async () => {
			await this.walletStore.getBalance()
		})
	}

	headerMenuClick (): void {
		this.isOpenMenuDrawer.value = !this.isOpenMenuDrawer.value
	}

	filterMenuClick (): void {
		this.isOpenFiltersDrawer.value = !this.isOpenFiltersDrawer.value
	}

	validAmount (): boolean {
		return !(this.isErrorAmount.value = !(
			this.amount.value || this.amount.value! > 0
		))
	}

	addIncome (): void {
		if (this.validAmount()) {
			this.walletStore.income.isOpenDialog = true
		}
	}

	addCost (): void {
		if (this.validAmount()) {
			this.walletStore.cost.isOpenDialog = true
		}
	}

	changeView (view: IMenuStoreState['view']): void {
		this.menuStore.setView(view)
	}
}

export function useDefaultLayoutData (): DefaultLayoutData {
	return new DefaultLayoutData()
}
