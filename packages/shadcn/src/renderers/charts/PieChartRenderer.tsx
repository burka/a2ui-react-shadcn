'use client'

import type { PieChartComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../../components/ui/chart.js'
import {
  buildChartConfig,
  generateChartDescription,
  getChartColor,
  getChartData,
  transformToRechartsData,
} from './chartUtils.js'

export const PieChartRenderer: A2UIRenderer<PieChartComponent> = {
  type: 'PieChart',
  render: ({ component, data: dataAccessor }: RendererProps<PieChartComponent>) => {
    const rawData = getChartData(component.data, component.dataPath, dataAccessor)
    const chartData = transformToRechartsData(rawData, component.colors)
    const chartConfig = buildChartConfig(rawData, component.colors)

    const height = component.height || 300
    const innerRadius = component.donut ? (component.innerRadius || 0.6) * 100 : 0
    const outerRadius = 100
    const animated = component.animated !== false

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>
          No data available
        </div>
      )
    }

    const chartDescription = generateChartDescription(component.donut ? 'Donut chart' : 'Pie chart', rawData)

    return (
      <div role="img" aria-label={chartDescription}>
        <ChartContainer config={chartConfig} className="mx-auto" style={{ height, width: '100%' }}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              isAnimationActive={animated}
              label={
                component.showLabels
                  ? ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`
                  : undefined
              }
              labelLine={component.showLabels}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={getChartColor(index, component.colors)} />
              ))}
            </Pie>
            {component.showLegend && <ChartLegend content={<ChartLegendContent />} />}
          </PieChart>
        </ChartContainer>
      </div>
    )
  },
  example: {
    name: 'Pie Chart',
    description: 'Circular chart for showing proportions and percentages',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'pie-chart-example', root: 'container' } },
      {
        updateComponents: {
          surfaceId: 'pie-chart-example',
          components: [
            {
              id: 'container',
              component: {
                type: 'Column',
                id: 'container',
                children: ['title', 'chart'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Sales by Region',
                style: 'h3',
              },
            },
            {
              id: 'chart',
              component: {
                type: 'PieChart',
                id: 'chart',
                data: [
                  { label: 'North', value: 400 },
                  { label: 'South', value: 300 },
                  { label: 'East', value: 200 },
                  { label: 'West', value: 280 },
                ],
                donut: true,
                showLegend: true,
                animated: true,
                height: 300,
              },
            },
          ],
        },
      },
    ],
  },
}
