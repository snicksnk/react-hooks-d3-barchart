import { Selection } from 'd3-selection';
import { ChartConfigType, AxisSetType, ScalesSetType, } from './types'


function drawBar(scalesSet: ScalesSetType, leftOffset: number, topOffset: number, value: number, height: number):string {
  return `M${leftOffset} ${topOffset}` + 
          `H ${scalesSet.x(value)}` + 
          `V ${topOffset + height}` + 
          `H ${leftOffset}` +
          `L ${leftOffset} ${topOffset}`;
}

export function drawChart(
  config: ChartConfigType,
  chart: Selection<SVGGElement, unknown, null, undefined>,
  scalesSet: ScalesSetType,
  titles: string[],
  values: number[][]
) {
  const { x: xScale, y: yScale } = scalesSet;

  console.log('values--', values.map(pair => (pair.map((item, n) => {
    return { value: item, size: pair.length, n };
  }))));
  
  const groups = chart
    .selectAll('g.bar-group')
    .data(values.map(pair => (pair.map((item, n) => {
      return { value: item, size: pair.length, n };
    }))))
    .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr("transform", 
        (_, n) => `translate(0, ${yScale(`${titles[n]}`)})`)
        
        
  const bars = groups.selectAll('path')
        .data(item => item)
          .enter()
  
  bars.append('path')
    .attr('class', d => `bar bar-${d.n}`)
    .attr("filter", "url(#filter)")
    .attr('d', (item, n, a) => {
      const bandWidth = yScale.bandwidth();
      const barsOffset = 3;
      if (item.size > 1) {
        const barSize = bandWidth / item.size;
        const topOffset = barSize * item.n;
        return drawBar(scalesSet, config.size.width / 2, topOffset, item.value, barSize - barsOffset);
      } else {
        return drawBar(scalesSet, config.size.width / 2, 0, item.value, bandWidth);
      }
    });

  bars.append('text')
    .attr('class', 'text')
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
    .attr('x', d => {
      const offset = d.value > 0 ? -3 : 3;
      return xScale(d.value) + offset;
    })
    .attr('y', (d, n) => {
      const bandWidth = yScale.bandwidth();
      const barSize = bandWidth / d.size;
      const topOffset = barSize * d.n + barSize / 2;
      // const topOffset = barSize * d.n + barSize / 2; 

      return topOffset;
    })
    .text(d => d.value)
}