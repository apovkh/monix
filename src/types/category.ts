export enum CATEGORY_TYPES_COSTS {
  Food = 'Food',
  Apartment = 'Apartment',
  Transport = 'Transport',
  Sport = 'Sport',
  Medicine = 'Medicine',
  Gift = 'Gift',
  Restaurants = 'Restaurants'
}

export enum CATEGORY_TYPES_INCOME {
  Income = 'Income'
}

export interface ICategory {
  color: string
  icon: string
  label: string
	type: CATEGORY_TYPES_COSTS | CATEGORY_TYPES_INCOME | null
}

export interface IBalanceItem {
  income: boolean
	date: any
  type: CATEGORY_TYPES_COSTS | CATEGORY_TYPES_INCOME
  icon?: string
	amount: number | string
  id: string | number
  comment?: any
}
