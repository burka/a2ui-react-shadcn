'use client'

import type { AreaChartComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart.js'
import {
  buildChartConfig,
  generateChartDescription,
  getChartColor,
  getChartData,
  transformToRechartsData,
} from './chartUtils.js'

export const AreaChartRenderer: A2UIRenderer<AreaChartComponent> = {
  type: 'AreaChart',
  render: ({ component, data: dataAccessor }: RendererProps<AreaChartComponent>) => {
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
    const showDots = component.showDots === true
    const fillOpacity = component.fillOpacity ?? 0.4
    const areaColor = component.color || getChartColor(0)
    const useGradient = component.gradient !== false

    if (chartData.length === 0) {
      return (
        <div className="flex items-center justify-center text-muted-foreground" style={{ height }}>
          No data available
        </div>
      )
    }

    const gradientId = `gradient-${component.id}`

    const chartDescription = generateChartDescription('Area chart', rawData)

    return (
      <div role="img" aria-label={chartDescription} style={{ height, width: '100%' }}>
        <ChartContainer config={chartConfig} style={{ height, width: '100%' }}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            {useGradient && (
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={areaColor} stopOpacity={fillOpacity} />
                  <stop offset="100%" stopColor={areaColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
            )}
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && (
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
            )}
            {showYAxis && <YAxis tickLine={false} axisLine={false} tickMargin={10} />}
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type={component.smooth ? 'monotone' : 'linear'}
              dataKey="value"
              stroke={areaColor}
              strokeWidth={2}
              fill={useGradient ? `url(#${gradientId})` : areaColor}
              fillOpacity={useGradient ? 1 : fillOpacity}
              dot={showDots}
              isAnimationActive={animated}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    )
  },
  example: {
    name: 'Area Chart',
    description: 'Filled area chart for cumulative values and trends',
    category: 'display',
    messages: [
      { createSurface: { surfaceId: 'area-chart-example', root: 'container' } },
      {
        updateComponents: {
          surfaceId: 'area-chart-example',
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
                content: 'Revenue Growth',
                style: 'h3',
              },
            },
            {
              id: 'chart',
              component: {
                type: 'AreaChart',
                id: 'chart',
                data: [
                  { label: 'Q1', value: 4000 },
                  { label: 'Q2', value: 5200 },
                  { label: 'Q3', value: 4800 },
                  { label: 'Q4', value: 7100 },
                ],
                smooth: true,
                gradient: true,
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
