'use client'

import type { LineChartComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart.js'
import {
  buildChartConfig,
  generateChartDescription,
  getChartColor,
  getChartData,
  transformToRechartsData,
} from './chartUtils.js'

export const LineChartRenderer: A2UIRenderer<LineChartComponent> = {
  type: 'LineChart',
  render: ({ component, data: dataAccessor }: RendererProps<LineChartComponent>) => {
    const rawData = getChartData(component.data, component.dataPath, dataAccessor)
    const chartData = transformToRechartsData(
      rawData,
      component.color ? [component.color] : undefined,
    )
    const chartConfig = buildChartConfig(rawData, component.color ? [component.color] : undefined)

    const height = component.height || 300
    const animated = component.animated !== false
    const showGrid = component.showGrid !== false
    const showXAxis = component.showXAxis !== false
    const showYAxis = component.showYAxis !== false
    const showDots = component.showDots !== false
    const strokeWidth = component.strokeWidth || 2
    const lineColor = component.color || getChartColor(0)

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>
          No data available
        </div>
      )
    }

    const chartDescription = generateChartDescription('Line chart', rawData)

    return (
      <div role="img" aria-label={chartDescription}>
        <ChartContainer config={chartConfig} style={{ height, width: '100%' }}>
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />}
            {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={10} />}
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type={component.smooth ? 'monotone' : 'linear'}
              dataKey="value"
              stroke={lineColor}
              strokeWidth={strokeWidth}
              dot={showDots}
              isAnimationActive={animated}
            />
          </LineChart>
        </ChartContainer>
      </div>
    )
  },
  example: {
    name: 'Line Chart',
    description: 'Line graph for showing trends over time',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'line-chart-example', root: 'container' } },
      {
        updateComponents: {
          surfaceId: 'line-chart-example',
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
                content: 'Website Traffic',
                style: 'h3',
              },
            },
            {
              id: 'chart',
              component: {
                type: 'LineChart',
                id: 'chart',
                data: [
                  { label: 'Mon', value: 1200 },
                  { label: 'Tue', value: 1900 },
                  { label: 'Wed', value: 1500 },
                  { label: 'Thu', value: 2100 },
                  { label: 'Fri', value: 2400 },
                  { label: 'Sat', value: 1800 },
                  { label: 'Sun', value: 1400 },
                ],
                smooth: true,
                showDots: true,
                showGrid: true,
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
