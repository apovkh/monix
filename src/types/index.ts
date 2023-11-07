export enum CATEGORY_TYPES_COSTS {
  Food = 'Food',
  Flat = 'Flat',
  Transport = 'Transport',
  Sport = 'Sport',
  Medicine = 'Medicine',
  Gift = 'Gift',
  Restaurants = 'Restaurants'
}

export enum CATEGORY_TYPES_INCREASE {
  Increase = 'Increase'
}

export interface IBalanceItem {
  increase: boolean
	date: string
	type: {
		name: CATEGORY_TYPES_COSTS
		icon?: string
	}
	amount: number | string
	id: string | number
}
