import type { IBalanceItem } from '../../../types'
import type { LSectionPropsTypes } from '../../'
export interface IATablePropsTypes extends LSectionPropsTypes {
  data: IBalanceItem[] | []
}
