import { computed } from 'vue'

import {
	mdiDumbbell,
	mdiFood,
	mdiGift,
	mdiHandCoinOutline,
	mdiHomeCity,
	mdiPillMultiple,
	mdiSilverwareForkKnife,
	mdiTrainCar
} from '@mdi/js'

import {
	CATEGORY_TYPES_COSTS,
	CATEGORY_TYPES_INCOME,
	type ICategory
} from '../types'

export type TUseCategory = Record<
	CATEGORY_TYPES_COSTS | CATEGORY_TYPES_INCOME,
	ICategory
>

export function useCategory (): TUseCategory {
	return computed(() => ({
		[CATEGORY_TYPES_COSTS.Food]: {
			color: '#ECEE81',
			icon: mdiFood,
			label: 'Їжа',
			category: CATEGORY_TYPES_COSTS.Food
		},
		[CATEGORY_TYPES_COSTS.Gift]: {
			color: '#8DDFCB',
			icon: mdiGift,
			label: 'Подарунки',
			category: CATEGORY_TYPES_COSTS.Gift
		},
		[CATEGORY_TYPES_COSTS.Apartment]: {
			color: '#F875AA',
			icon: mdiHomeCity,
			label: 'Житло',
			category: CATEGORY_TYPES_COSTS.Apartment
		},
		[CATEGORY_TYPES_COSTS.Sport]: {
			color: '#6F61C0',
			icon: mdiDumbbell,
			label: 'Спорт',
			category: CATEGORY_TYPES_COSTS.Sport
		},
		[CATEGORY_TYPES_COSTS.Transport]: {
			color: '#8BE8E5',
			icon: mdiTrainCar,
			label: 'Транспорт',
			category: CATEGORY_TYPES_COSTS.Transport
		},
		[CATEGORY_TYPES_COSTS.Medicine]: {
			color: '#F99417',
			icon: mdiPillMultiple,
			label: 'Медицина',
			category: CATEGORY_TYPES_COSTS.Medicine
		},
		[CATEGORY_TYPES_COSTS.Restaurants]: {
			color: '#F6635C',
			icon: mdiSilverwareForkKnife,
			label: 'Ресторани',
			category: CATEGORY_TYPES_COSTS.Restaurants
		},
		[CATEGORY_TYPES_INCOME.Income]: {
			color: '#00ff00',
			icon: mdiHandCoinOutline,
			label: 'Надходження',
			category: CATEGORY_TYPES_INCOME.Income
		}
	}))
}
