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

import { CATEGORY_TYPES_COSTS, CATEGORY_TYPES_INCOME } from '../types/index'

export function useCategory (): string {
	return computed(() => ({
		[CATEGORY_TYPES_COSTS.Food]: {
			color: '#ECEE81',
			icon: mdiFood,
			label: 'Food'
		},
		[CATEGORY_TYPES_COSTS.Gift]: {
			color: '#8DDFCB',
			icon: mdiGift,
			label: 'Gifts'
		},
		[CATEGORY_TYPES_COSTS.Apartment]: {
			color: '#F875AA',
			icon: mdiHomeCity,
			label: 'Apartment'
		},
		[CATEGORY_TYPES_COSTS.Sport]: {
			color: '#6F61C0',
			icon: mdiDumbbell,
			label: 'Sport'
		},
		[CATEGORY_TYPES_COSTS.Transport]: {
			color: '#8BE8E5',
			icon: mdiTrainCar,
			label: 'Transport'
		},
		[CATEGORY_TYPES_COSTS.Medicine]: {
			color: '#F99417',
			icon: mdiPillMultiple,
			label: 'Medicine'
		},
		[CATEGORY_TYPES_COSTS.Restaurants]: {
			color: '#F6635C',
			icon: mdiSilverwareForkKnife,
			label: 'restaurants'
		},
		[CATEGORY_TYPES_INCOME.Income]: {
			color: '#00ff00',
			icon: mdiHandCoinOutline,
			label: 'Income'
		}
	}))
}
