import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { animate, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

interface CountUpComponent {
  type: 'CountUp'
  id: string
  from?: number
  to: number
  duration?: number
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'caption'
  prefix?: string
  suffix?: string
  decimals?: number
  separator?: string
}

const styleClasses: Record<string, string> = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  body: 'leading-7',
  caption: 'text-sm text-muted-foreground',
}

const formatNumber = (num: number, decimals: number, separator: string): string => {
  const fixed = num.toFixed(decimals)
  const parts = fixed.split('.')
  const whole = parts[0] || '0'
  const decimal = parts[1]
  const withSeparator = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return decimal ? `${withSeparator}.${decimal}` : withSeparator
}

export const CountUpRenderer: A2UIRenderer<CountUpComponent> = {
  type: 'CountUp',
  render: ({ component }: RendererProps<CountUpComponent>) => {
    const prefersReducedMotion = useReducedMotion()
    const count = useMotionValue(component.from || 0)
    const [displayValue, setDisplayValue] = useState(component.from || 0)

    const duration = component.duration || 2
    const decimals = component.decimals || 0
    const separator = component.separator || ','

    useEffect(() => {
      if (prefersReducedMotion) {
        setDisplayValue(component.to)
        return
      }

      const controls = animate(count, component.to, {
        duration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          setDisplayValue(latest)
        },
      })

      return controls.stop
    }, [component.to, duration, count, prefersReducedMotion])

    const className = styleClasses[component.style || 'body']
    const formattedValue = formatNumber(displayValue, decimals, separator)

    return (
      <span className={className} style={{ color: 'hsl(var(--foreground))' }}>
        {component.prefix || ''}
        {formattedValue}
        {component.suffix || ''}
      </span>
    )
  },
  example: {
    name: 'Count Up',
    description: 'Animated number counter that counts up to a value',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'countup-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'countup-example',
          components: [
            {
              id: 'col-1',
              component: {
                type: 'Column',
                id: 'col-1',
                children: ['count-1', 'count-2', 'count-3'],
              },
            },
            {
              id: 'count-1',
              component: { type: 'CountUp', id: 'count-1', to: 1000, style: 'h1', duration: 2 },
            },
            {
              id: 'count-2',
              component: {
                type: 'CountUp',
                id: 'count-2',
                to: 99.99,
                style: 'h2',
                prefix: '$',
                decimals: 2,
              },
            },
            {
              id: 'count-3',
              component: {
                type: 'CountUp',
                id: 'count-3',
                from: 0,
                to: 1000000,
                style: 'h3',
                suffix: '+',
                separator: ',',
              },
            },
          ],
        },
      },
    ],
  },
}
