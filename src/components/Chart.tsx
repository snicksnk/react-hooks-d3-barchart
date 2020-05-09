import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition as d3Transition } from 'd3-transition';

import * as Scales from './scales';

import { ChartConfigType, AxisSetType, ScalesSetType, ChartType } from './types'
import { drawChart } from './drawChart';
import { drawAxis } from './drawAxis';


select.prototype.transition = d3Transition;


interface ChartProps { values: number[][]; titles: string[]; };


function useChartConfig() {
  const margin = {top: 20, right: 20, bottom: 20, left: 40};
  const width = 800 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  const ChartConfig: ChartConfigType = {
    size: {
      width,
      height,
    },
    margins: margin
  };

  const configRef = useRef<ChartConfigType>(ChartConfig);

  return configRef.current;
}

const Chart = ({ values, titles }: ChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const ChartConfig = useChartConfig();

  const limsX = [ -50, 50 ];

  const chart = useRef<ChartType>();

  useEffect(() => {
    const { size: { width, height }, margins } = ChartConfig;
    const svg = select(svgRef.current)
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)


    chart.current = svg
      .append('g')
      .attr("transform", 
        "translate(" + margins.left + "," + margins.top + ")");
  }, [ChartConfig]);


  const axisIsSetted = useRef(false);
  useEffect(
    () => {
      const { size: { height } } = ChartConfig;
      const scalesSet: ScalesSetType = {
        x: Scales.x(ChartConfig, limsX),
        y: Scales.y(ChartConfig, titles),
      };

      const axisSet: AxisSetType = {
        x: axisBottom(scalesSet.x).ticks(10, "s").tickSize(-1 * height),
        y: axisLeft(scalesSet.y),
      };

      if (chart.current) {
        if (!axisIsSetted.current) {
          drawAxis(ChartConfig, chart.current, axisSet);
          axisIsSetted.current = true;
        }
        if (chart.current) {
          drawChart(ChartConfig, chart.current, scalesSet, titles, values);
        }
      }

    },
    [ChartConfig, limsX, titles, values ]
  );

  return (
    <svg ref={svgRef}>
      <defs>
        <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
	        <feDropShadow stdDeviation="5 5" in="SourceGraphic" dx="5" dy="5" flood-color="#000000" flood-opacity="0.5" x="0%" y="0%" width="100%" height="100%" result="dropShadow"/>
        </filter>
      </defs>
      <g className="chart"></g>
    </svg>
  )
};

export default Chart;