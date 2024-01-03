import { computed } from 'vue'

import {
	mdiDumbbell,
	mdiFood,
	mdiGift,
	mdiHomeCity,
	mdiPillMultiple,
	mdiSilverwareForkKnife,
	mdiTrainCar
} from '@mdi/js'

import { CATEGORY_TYPES_COSTS } from '../types/index'

export function useCategory (): string {
	return computed(() => ({
		[CATEGORY_TYPES_COSTS.Food]: {
			color: '#ECEE81',
			icon: mdiFood
		},
		[CATEGORY_TYPES_COSTS.Gift]: {
			color: '#8DDFCB',
			icon: mdiGift
		},
		[CATEGORY_TYPES_COSTS.Flat]: {
			color: '#F875AA',
			icon: mdiHomeCity
		},
		[CATEGORY_TYPES_COSTS.Sport]: {
			color: '#6F61C0',
			icon: mdiDumbbell
		},
		[CATEGORY_TYPES_COSTS.Transport]: {
			color: '#8BE8E5',
			icon: mdiTrainCar
		},
		[CATEGORY_TYPES_COSTS.Medicine]: {
			color: '#F99417',
			icon: mdiPillMultiple
		},
		[CATEGORY_TYPES_COSTS.Restaurants]: {
			color: '#F6635C',
			icon: mdiSilverwareForkKnife
		}
	}))
}
