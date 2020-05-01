import React from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition as d3Transition } from 'd3-transition';

import * as Scales from './scales';

import { ChartConfigType } from './types'


select.prototype.transition = d3Transition;


const Chart = () => {
  const svgRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(
    () => {


      const margin = {top: 20, right: 20, bottom: 20, left: 20};
      const width = 600 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)


      const chart =  svg
        .append('g')
        .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


      const values = [[10, 20], [-50, 50], [50], [-20, -25]];

      const ChartConfig: ChartConfigType = {
        size: {
          width,
          height,
        },
        margins: margin
      }


      const limsX = [ -50, 50 ];

      const xScale = Scales.x(ChartConfig, limsX);

      const yScale = Scales.y(ChartConfig, Object.keys(values));


      const xAxis = axisBottom(xScale).ticks(10, "s");
      const yAxis = axisLeft(yScale)

      function drawBar(leftOffset: number, topOffset: number, value: number, height: number):string {
          return `M${leftOffset} ${topOffset}` + 
                 `H ${xScale(value)}` + 
                 `V ${topOffset + height}` + 
                 `H ${leftOffset}` +
                 `L ${leftOffset} ${topOffset}`;
      }
      



      const groups = chart
        .selectAll('g')
        .data(values.map(pair => (pair.map((item, n) => {
          return { value: item, size: pair.length, n };
        }))))
        .enter()
          .append('g')
          .attr("transform", 
            (_, n) => `translate(0, ${yScale(`${n}`)})`)
            
            
      const bars = groups.selectAll('path')
            .data(item => item)
              .enter()
      
      bars.append('path')
        .style('fill', '#1b79c1')
        .attr('d', (item, n, a) => {
          const bandWidth = yScale.bandwidth();
          const barsOffset = 3;
          if (item.size > 1) {
            const barSize = bandWidth / item.size;
            const topOffset = barSize * item.n;
            return drawBar(width / 2, topOffset, item.value, barSize - barsOffset);
          } else {
            return drawBar(width / 2, 0, item.value, bandWidth);
          }
        });

      bars.append('text')
        .attr('text-anchor', item => {
          if (item.value > 0) {
            return 'end';
          } else if (item.value < 0) {
            return 'start';
          } else {
            return 'center';
          }
        })
        .attr('dy', '+.2em')
        .attr('x', d => xScale(d.value))
        .attr('y', (d, n) => {
          const bandWidth = yScale.bandwidth();
          const barSize = bandWidth / d.size;
          const topOffset = barSize * d.n + barSize / 2;
          // const topOffset = barSize * d.n + barSize / 2; 

          return topOffset;
        })
        .text(d => d.value)
            
      
      chart
        .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)

      chart
        .append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(0, 0)")
          .call(yAxis)



      /*
      const yScale = scaleLinear()
        .domain([yMax, yMin])
          .range([settings.chartOffset.y, settings.height - settings.chartOffset.y])
          .nice();
      */

    },
    [svgRef.current]
  )

  return (
    <svg ref={svgRef}>
      
    </svg>
  )
};

export default Chart;