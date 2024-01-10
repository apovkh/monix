import type { ILSectionPropsTypes } from '../../'

export interface IAChartPropsTypes extends ILSectionPropsTypes {
  // don't rename to data, it breaks displaying chart
  chartData: any
}
