import type { LSectionPropsTypes } from '../../'

export interface IAChartPropsTypes extends LSectionPropsTypes {
  // don't rename to data, it breaks displaying chart
  chartData: any
}
