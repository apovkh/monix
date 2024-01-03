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

export enum DATE_TYPES {
  Today,
  Yesterday,
  Week,
  Month,
  Year,
  FullTime
}

export interface IBalanceItem {
  income: boolean
	date: any
	type: {
		name: CATEGORY_TYPES_COSTS | CATEGORY_TYPES_INCOME
		icon?: string
	}
	amount: number | string
	id: string | number
}

export interface INavigationItem {
  icon: string
  active: boolean
  value: number | string
  component: any
}
