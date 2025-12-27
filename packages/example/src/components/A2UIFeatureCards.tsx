/**
 * Feature Cards rendered entirely through A2UI protocol
 * This demonstrates dogfooding - using A2UI to render our own UI
 */

import { A2UISurface, buildMessages, c } from 'a2ui-react'
import { useMemo } from 'react'

interface Feature {
  icon: string
  title: string
  description: string
}

interface A2UIFeatureCardsProps {
  features: Feature[]
}

/**
 * Renders feature cards using A2UI protocol messages.
 * Instead of raw HTML/JSX, we build A2UI messages and render them.
 */
export function A2UIFeatureCards({ features }: A2UIFeatureCardsProps) {
  const messages = useMemo(() => {
    return buildMessages(
      'feature-cards',
      c.row({ distribution: 'equal' }, [
        ...features.map((feature, _index) =>
          c.card({}, [
            c.column({ alignment: 'center' }, [
              c.icon(feature.icon),
              c.text(feature.title, { style: 'h4' }),
              c.text(feature.description, { style: 'body' }),
            ]),
          ]),
        ),
      ]),
    )
  }, [features])

  return <A2UISurface surfaceId="feature-cards" messages={messages} />
}

/**
 * Example usage with static data - can be used directly in HomePage
 */
export function FeatureCardsExample() {
  const features: Feature[] = [
    {
      icon: 'Zap',
      title: 'Server-Driven',
      description: 'Stream UI updates in real-time from any backend',
    },
    {
      icon: 'Palette',
      title: 'Beautiful Components',
      description: 'Built on shadcn/ui with full theming support',
    },
    {
      icon: 'Code',
      title: 'Type-Safe Protocol',
      description: 'Strongly typed messages with TypeScript support',
    },
  ]

  return <A2UIFeatureCards features={features} />
}
