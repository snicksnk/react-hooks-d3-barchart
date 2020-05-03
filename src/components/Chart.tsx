import React, { useEffect } from 'react';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition as d3Transition } from 'd3-transition';

import * as Scales from './scales';

import { ChartConfigType, AxisSetType, ScalesSetType } from './types'
import { drawChart } from './drawChart';
import { drawAxis } from './drawAxis';


select.prototype.transition = d3Transition;


const Chart = () => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  useEffect(
    () => {
      const margin = {top: 20, right: 20, bottom: 20, left: 40};
      const width = 800 - margin.left - margin.right;
      const height = 450 - margin.top - margin.bottom;

      const svg = select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


      const chart =  svg
        .append('g')
        .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


      const values = [[10, 20], [-48, 50], [50], [-20, -25]];

      const titles = ['Cats', 'Dogs', 'Birds', 'Cows'];

      const ChartConfig: ChartConfigType = {
        size: {
          width,
          height,
        },
        margins: margin
      }

      const limsX = [ -50, 50 ];

      const scalesSet: ScalesSetType = {
        x: Scales.x(ChartConfig, limsX),
        y: Scales.y(ChartConfig, titles),
      };

      const axisSet: AxisSetType = {
        x: axisBottom(scalesSet.x).ticks(10, "s").tickSize(-1 * height),
        y: axisLeft(scalesSet.y),
      };

      drawAxis(ChartConfig, chart, axisSet);
      drawChart(ChartConfig, chart, scalesSet, titles, values);


    },
    [svgRef.current]
  )

  return (
    <svg ref={svgRef}>
      <defs>
        <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
	        <feDropShadow stdDeviation="5 5" in="SourceGraphic" dx="5" dy="5" flood-color="#000000" flood-opacity="0.5" x="0%" y="0%" width="100%" height="100%" result="dropShadow"/>
        </filter>
      </defs>
      
    </svg>
  )
};

export default Chart;


/*

          <feFlood flood-color="#000000" flood-opacity="1" result="COLOR-blue" />
          <feTurbulence baseFrequency=".025" type="fractalNoise" numOctaves="3" seed="0" result="Texture" />
          <feOffset dx="-3" dy="4" in="SourceAlpha" result="step1"/>
          <feDisplacementMap scale="17" in="step1" in2="Texture" result="step2" />
          <feComposite operator="in" in="Texture" in2 = "step2" result="step3"/>
          <feComposite operator="in" in="COLOR-blue" in2="step3" result="fill-filter" />
          <feMerge  result="merge2">
          <feMergeNode in="fill-filter" />
          </feMerge>

*/