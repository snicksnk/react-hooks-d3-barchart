import { Selection, select } from 'd3-selection';
import { ChartConfigType, ScalesSetType } from './types'


function drawBar(scalesSet: ScalesSetType, leftOffset: number, topOffset: number, value: number, height: number):string {
  return `M${leftOffset} ${topOffset}` + 
          `H ${scalesSet.x(value)}` + 
          `V ${topOffset + height}` + 
          `H ${leftOffset}` +
          `L ${leftOffset} ${topOffset}`;
}

export function drawChart(
  config: ChartConfigType,
  chart2: Selection<SVGGElement, unknown, null, undefined>,
  scalesSet: ScalesSetType,
  titles: string[],
  values: number[][]
) {
  const { x: xScale, y: yScale } = scalesSet;

  type preparedValue = { value: number, size: number, n: number, groupName: string };

  const preparedValues: preparedValue[][] = values.map((pair, key)  => (pair.map((item, n) => {
    return { value: item, size: pair.length, n, groupName: titles[key] };
  })));

  const chart = select<SVGGElement, preparedValue[]>('#chart')
  

  // GROUPS 

  const groups = chart
    .selectAll<SVGGElement, preparedValue[]>('g.bar-group')
    .data(preparedValues)


  groups.attr("transform", 
        (_, n) => `translate(0, ${yScale(`${titles[n]}`)})`);

  
  const groupsEnter = groups.enter()
      .append('g')
      .attr('class', (_ ,n) => `bar-group bar-group-${n}`)

  const groupsUpdate = groupsEnter.merge(groups);

  groupsUpdate.attr("transform", 
    (_, n) => `translate(0, ${yScale(`${titles[n]}`)})`)

  groups.exit().remove();



  // BARS
  const bars = groups.selectAll<SVGPathElement, preparedValue>('path')
        .data(item => item, d => `${d.groupName}_${d.n}`)

  bars.attr("class", 1)

  const barsEnter = bars.enter().append('path');

  const barsUpdate = barsEnter
    .merge(bars)
  
  barsUpdate
    .attr('class', d => `bar bar-${d.n}`)
    .attr("filter", "url(#filter)")
    .transition()
    .duration(1000)
    .attr('d', (item, n, a) => {
      console.log(item);
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


  bars.exit().remove();

  /*
  barsUpdate.append('text')
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
  */
}


  /*
  const barsUpdate = groups.selectAll('path').data(item => item);
    
  barsUpdate.attr('class', d => `bar bar-${d.n}`)
    .attr("filter", "url(#filter)")
    .transition()
    .duration(2000)
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
  */