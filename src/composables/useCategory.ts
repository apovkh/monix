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
			label: 'Їжа'
		},
		[CATEGORY_TYPES_COSTS.Gift]: {
			color: '#8DDFCB',
			icon: mdiGift,
			label: 'Подарунки'
		},
		[CATEGORY_TYPES_COSTS.Apartment]: {
			color: '#F875AA',
			icon: mdiHomeCity,
			label: 'Житло'
		},
		[CATEGORY_TYPES_COSTS.Sport]: {
			color: '#6F61C0',
			icon: mdiDumbbell,
			label: 'Спорт'
		},
		[CATEGORY_TYPES_COSTS.Transport]: {
			color: '#8BE8E5',
			icon: mdiTrainCar,
			label: 'Транспорт'
		},
		[CATEGORY_TYPES_COSTS.Medicine]: {
			color: '#F99417',
			icon: mdiPillMultiple,
			label: 'Медицина'
		},
		[CATEGORY_TYPES_COSTS.Restaurants]: {
			color: '#F6635C',
			icon: mdiSilverwareForkKnife,
			label: 'Ресторани'
		},
		[CATEGORY_TYPES_INCOME.Income]: {
			color: '#00ff00',
			icon: mdiHandCoinOutline,
			label: 'Надходження'
		}
	}))
}
