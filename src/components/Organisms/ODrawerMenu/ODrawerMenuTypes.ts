import type { DATA_SCREEN_VIEW } from '../../../types'
import type { IADrawerPropsTypes } from '../../'

export interface IODrawerMenuPropsTypes {
  data: {
		label: string
		value: DATA_SCREEN_VIEW
		icon: string
  }[]
  view: DATA_SCREEN_VIEW
  modelValue: IADrawerPropsTypes['modelValue']
}
