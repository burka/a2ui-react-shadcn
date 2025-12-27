/**
 * Chart utility functions and constants
 */

import type { ChartDataItem } from 'a2ui-react-core'
import type { DataAccessor } from 'a2ui-react-react'

/**
 * Default chart colors using CSS variables for theme support
 */
export const DEFAULT_CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

/**
 * Fallback colors if CSS variables are not defined
 */
export const FALLBACK_COLORS = [
  'hsl(221 83% 53%)', // Blue
  'hsl(142 71% 45%)', // Green
  'hsl(47 96% 53%)', // Yellow
  'hsl(0 84% 60%)', // Red
  'hsl(262 83% 58%)', // Purple
]

/**
 * Get chart data from static data or data model
 */
export function getChartData(
  staticData: ChartDataItem[] | undefined,
  dataPath: string | undefined,
  dataAccessor: DataAccessor,
): ChartDataItem[] {
  if (dataPath) {
    const dynamicData = dataAccessor.get<ChartDataItem[]>(dataPath)
    if (dynamicData && Array.isArray(dynamicData)) {
      return dynamicData
    }
  }
  return staticData || []
}

/**
 * Get color for a data point at a given index
 */
export function getChartColor(index: number, customColors?: string[]): string {
  const colors: string[] =
    customColors && customColors.length > 0 ? customColors : DEFAULT_CHART_COLORS
  const colorIndex = index % colors.length
  // Non-null assertion is safe here because:
  // 1. colors array is never empty (falls back to DEFAULT_CHART_COLORS which has 5 elements)
  // 2. colorIndex uses modulo so it's always within bounds
  return colors[colorIndex]!
}

/**
 * Transform ChartDataItem array to Recharts-compatible format
 * Recharts expects { name: string, value: number } by default
 */
export function transformToRechartsData(
  data: ChartDataItem[],
  customColors?: string[],
): Array<{ name: string; value: number; fill: string; [key: string]: unknown }> {
  return data.map((item, index) => ({
    ...item,
    name: item.label,
    value: item.value,
    fill: item.color || getChartColor(index, customColors),
  }))
}

/**
 * Build chart config for shadcn ChartContainer
 */
export function buildChartConfig(
  data: ChartDataItem[],
  customColors?: string[],
): Record<string, { label: string; color: string }> {
  const config: Record<string, { label: string; color: string }> = {}

  data.forEach((item, index) => {
    config[item.label] = {
      label: item.label,
      color: item.color || getChartColor(index, customColors),
    }
  })

  // Also add a 'value' key for simple charts
  config.value = {
    label: 'Value',
    color: getChartColor(0, customColors),
  }

  return config
}

/**
 * Generate accessible description for chart data
 * Used for screen readers via aria-label
 */
export function generateChartDescription(chartType: string, data: ChartDataItem[]): string {
  if (data.length === 0) {
    return `${chartType} with no data`
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const maxItem = data.reduce((max, item) => (item.value > max.value ? item : max), data[0]!)
  const minItem = data.reduce((min, item) => (item.value < min.value ? item : min), data[0]!)

  const dataPoints = data.map((item) => `${item.label}: ${item.value}`).join(', ')

  return `${chartType} with ${data.length} data points. Values: ${dataPoints}. Highest: ${maxItem.label} (${maxItem.value}). Lowest: ${minItem.label} (${minItem.value}). Total: ${total}.`
}
