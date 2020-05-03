import { scaleLinear, scaleBand } from 'd3-scale';

import { ChartConfigType } from './types';

export function x(config: ChartConfigType, lims: number[]) {
  const xScale = scaleLinear()
    .domain(lims)
      .range([0, config.size.width])
      .nice();
  
  return xScale;
}

export function y(config: ChartConfigType, values: string[]) {
  const yScale = scaleBand()
    .domain(values)
    .range([0, config.size.height])
    .paddingInner(0.1)
    .paddingOuter(0.2)
    .align(0.9)
    .round(true)

  return yScale;
}