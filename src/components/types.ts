
export interface ChartMarginsType {
  top: number,
  right: number,
  bottom: number,
  left: number
}

export interface ChartSizeType {
  width: number,
  height: number,
}

export interface ChartConfig {
  size: ChartSizeType,
  margins: ChartMarginsType
}


export type ChartConfigType = ChartConfig;