import type { IBalanceItem } from '../../../types'
import type { ILSectionPropsTypes } from '../../'

export interface IATablePropsTypes extends ILSectionPropsTypes {
  data: IBalanceItem[] | []
}
