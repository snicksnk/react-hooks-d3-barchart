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
  const configRaw = ({
    domain: Object.keys(values), // 👀 change me!
    paddingInner: 0.1, // 👀 me!
    paddingOuter: 0.2, // 👀 change me!
    round: true, // 👀 and me!
    align: 0.5, // 👀 !
    range: [100, Math.min(800, config.size.width - 40)] // 👀 yes
  });

  const yScale = scaleBand()
    .domain(configRaw.domain)
    .range([0, config.size.height])
    .paddingInner(configRaw.paddingInner)
    .paddingOuter(configRaw.paddingOuter)
    .align(configRaw.align)
    .round(configRaw.round)

  return yScale;
}