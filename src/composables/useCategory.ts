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

import type { CATEGORY_TYPES_INCOME, ICategory } from '../types/index'
import { CATEGORY_TYPES_COSTS } from '../types/index'

export function useCategory (): any {
	return computed(() => ({
		[CATEGORY_TYPES_COSTS.Food]: {
			color: '#ECEE81',
			icon: mdiFood,
			label: 'Їжа',
			type: CATEGORY_TYPES_COSTS.Food
		},
		[CATEGORY_TYPES_COSTS.Gift]: {
			color: '#8DDFCB',
			icon: mdiGift,
			label: 'Подарунки',
			type: CATEGORY_TYPES_COSTS.Gift
		},
		[CATEGORY_TYPES_COSTS.Apartment]: {
			color: '#F875AA',
			icon: mdiHomeCity,
			label: 'Житло',
			type: CATEGORY_TYPES_COSTS.Apartment
		},
		[CATEGORY_TYPES_COSTS.Sport]: {
			color: '#6F61C0',
			icon: mdiDumbbell,
			label: 'Спорт',
			type: CATEGORY_TYPES_COSTS.Sport
		},
		[CATEGORY_TYPES_COSTS.Transport]: {
			color: '#8BE8E5',
			icon: mdiTrainCar,
			label: 'Транспорт',
			type: CATEGORY_TYPES_COSTS.Transport
		},
		[CATEGORY_TYPES_COSTS.Medicine]: {
			color: '#F99417',
			icon: mdiPillMultiple,
			label: 'Медицина',
			type: CATEGORY_TYPES_COSTS.Medicine
		},
		[CATEGORY_TYPES_COSTS.Restaurants]: {
			color: '#F6635C',
			icon: mdiSilverwareForkKnife,
			label: 'Ресторани',
			type: CATEGORY_TYPES_COSTS.Restaurants
		}
		// [CATEGORY_TYPES_INCOME.Income]: {
		// 	color: '#00ff00',
		// 	icon: mdiHandCoinOutline,
		// 	label: 'Надходження',
		// 	value: CATEGORY_TYPES_INCOME.Income
		// }
	}))
}
