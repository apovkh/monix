export enum CATEGORY_TYPES_COSTS {
  Food = 'Food',
  Flat = 'Flat',
  Transport = 'Transport',
  Sport = 'Sport',
  Medicine = 'Medicine',
  Gift = 'Gift',
  Restaurants = 'Restaurants'
}

export enum CATEGORY_TYPES_INCOME {
  Income = 'Income'
}

export interface IBalanceItem {
  income: boolean
	date: string
	type: {
		name: CATEGORY_TYPES_COSTS | CATEGORY_TYPES_INCOME
		icon?: string
	}
	amount: number | string
	id: string | number
}
