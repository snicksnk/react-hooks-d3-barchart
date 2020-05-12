import { Selection, BaseType } from 'd3-selection';
import * as d3Axis from 'd3-axis';

interface ChartMarginsType {
  top: number,
  right: number,
  bottom: number,
  left: number
}

interface ChartSizeType {
  width: number,
  height: number,
}

interface ChartConfig {
  size: ChartSizeType,
  margins: ChartMarginsType
}

export type ChartConfigType = ChartConfig;

export type AxisSetType = {
  x: any,
  y: any
}

export type ScalesSetType = {
  x: any,
  y: any
}

export type ChartType = Selection<SVGGElement, unknown, null, undefined>;