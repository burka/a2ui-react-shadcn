'use client'

import type { BarChartComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart.js'
import {
  buildChartConfig,
  generateChartDescription,
  getChartColor,
  getChartData,
  transformToRechartsData,
} from './chartUtils.js'

export const BarChartRenderer: A2UIRenderer<BarChartComponent> = {
  type: 'BarChart',
  render: ({ component, data: dataAccessor }: RendererProps<BarChartComponent>) => {
    const rawData = getChartData(component.data, component.dataPath, dataAccessor)
    const chartData = transformToRechartsData(rawData, component.colors)
    const chartConfig = buildChartConfig(rawData, component.colors)

    const height = component.height || 300
    const radius = component.radius ?? 4
    const animated = component.animated !== false
    const showGrid = component.showGrid !== false
    const showXAxis = component.showXAxis !== false
    const showYAxis = component.showYAxis !== false

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>
          No data available
        </div>
      )
    }

    const ChartComponent = component.horizontal ? (
      <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
        {showGrid && <CartesianGrid horizontal={false} />}
        {showYAxis && (
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={80}
          />
        )}
        {showXAxis && <XAxis type="number" hide />}
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={radius} isAnimationActive={animated}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={getChartColor(index, component.colors)} />
          ))}
        </Bar>
      </BarChart>
    ) : (
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />}
        {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={10} />}
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" radius={radius} isAnimationActive={animated}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={getChartColor(index, component.colors)} />
          ))}
        </Bar>
      </BarChart>
    )

    const chartDescription = generateChartDescription('Bar chart', rawData)

    return (
      <div role="img" aria-label={chartDescription} style={{ height, width: '100%' }}>
        <ChartContainer config={chartConfig} style={{ height, width: '100%' }}>
          {ChartComponent}
        </ChartContainer>
      </div>
    )
  },
  example: {
    name: 'Bar Chart',
    description: 'Vertical or horizontal bars for comparing values',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'bar-chart-example', root: 'container' } },
      {
        updateComponents: {
          surfaceId: 'bar-chart-example',
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
                content: 'Monthly Revenue',
                style: 'h3',
              },
            },
            {
              id: 'chart',
              component: {
                type: 'BarChart',
                id: 'chart',
                data: [
                  { label: 'Jan', value: 186 },
                  { label: 'Feb', value: 305 },
                  { label: 'Mar', value: 237 },
                  { label: 'Apr', value: 73 },
                  { label: 'May', value: 209 },
                  { label: 'Jun', value: 214 },
                ],
                showGrid: true,
                animated: true,
                height: 300,
                radius: 6,
              },
            },
          ],
        },
      },
    ],
  },
}
