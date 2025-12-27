import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion.js'

interface TextScrambleComponent {
  type: 'TextScramble'
  id: string
  content: string
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'caption'
  speed?: number
  characters?: string
  trigger?: 'mount' | 'hover'
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

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export const TextScrambleRenderer: A2UIRenderer<TextScrambleComponent> = {
  type: 'TextScramble',
  render: ({ component }: RendererProps<TextScrambleComponent>) => {
    const [displayText, setDisplayText] = useState(component.content)
    const [isAnimating, setIsAnimating] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    const speed = component.speed || 30
    const characters = component.characters || defaultCharacters
    const trigger = component.trigger || 'mount'

    const scramble = () => {
      if (prefersReducedMotion || isAnimating) return
      setIsAnimating(true)

      const target = component.content
      const length = target.length
      let iteration = 0
      const maxIterations = length * 3

      const interval = setInterval(() => {
        setDisplayText(
          target
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < iteration / 3) {
                return target[index]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join(''),
        )

        iteration++

        if (iteration >= maxIterations) {
          clearInterval(interval)
          setDisplayText(target)
          setIsAnimating(false)
        }
      }, speed)
    }

    useEffect(() => {
      if (trigger === 'mount') {
        scramble()
      }
      // biome-ignore lint/correctness/useExhaustiveDependencies: scramble function is stable and doesn't need to be in deps
    }, [trigger, scramble])

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        scramble()
      }
    }

    const className = styleClasses[component.style || 'body']

    if (trigger === 'hover') {
      return (
        <button
          type="button"
          className={className}
          style={{
            color: 'hsl(var(--foreground))',
            fontFamily: 'monospace',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          onMouseEnter={handleMouseEnter}
          onFocus={handleMouseEnter}
        >
          {displayText}
        </button>
      )
    }

    return (
      <span
        className={className}
        style={{ color: 'hsl(var(--foreground))', fontFamily: 'monospace' }}
      >
        {displayText}
      </span>
    )
  },
  example: {
    name: 'Text Scramble',
    description: 'Text that scrambles and reveals character by character',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'scramble-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'scramble-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['text-1', 'text-2'] },
            },
            {
              id: 'text-1',
              component: {
                type: 'TextScramble',
                id: 'text-1',
                content: 'DECODING...',
                style: 'h2',
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'TextScramble',
                id: 'text-2',
                content: 'Hover to scramble',
                style: 'body',
                trigger: 'hover',
              },
            },
          ],
        },
      },
    ],
  },
}
