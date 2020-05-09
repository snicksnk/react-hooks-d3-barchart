import { ChartConfigType, AxisSetType, ChartType } from './types'

export function drawAxis(chartConfig: ChartConfigType, chart: ChartType, axisSet: AxisSetType) {
  const { x: xAxis, y: yAxis } = axisSet;
  if (chart) {
    chart
      .append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${chartConfig.size.height})`)
        .call(xAxis)

    chart
      .append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(0, 0)")
        .call(yAxis)
  }
}