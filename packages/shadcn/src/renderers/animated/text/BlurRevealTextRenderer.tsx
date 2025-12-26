import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'

interface BlurRevealTextComponent {
  type: 'BlurRevealText'
  id: string
  content: string
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'caption'
  delay?: number
  duration?: number
  staggerChildren?: number
  direction?: 'up' | 'down' | 'left' | 'right'
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

const getInitialPosition = (direction: string) => {
  switch (direction) {
    case 'up':
      return { y: 20 }
    case 'down':
      return { y: -20 }
    case 'left':
      return { x: 20 }
    case 'right':
      return { x: -20 }
    default:
      return { y: 20 }
  }
}

export const BlurRevealTextRenderer: A2UIRenderer<BlurRevealTextComponent> = {
  type: 'BlurRevealText',
  render: ({ component }: RendererProps<BlurRevealTextComponent>) => {
    const words = component.content.split(' ')
    const delay = component.delay || 0
    const duration = component.duration || 0.5
    const stagger = component.staggerChildren || 0.1
    const direction = component.direction || 'up'

    const initialPosition = getInitialPosition(direction)

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay,
          staggerChildren: stagger,
        },
      },
    }

    const wordVariants = {
      hidden: {
        opacity: 0,
        filter: 'blur(10px)',
        ...initialPosition,
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        transition: {
          duration,
          ease: 'easeOut' as const,
        },
      },
    }

    const className = styleClasses[component.style || 'body']

    return (
      <motion.span
        className={className}
        style={{
          color: 'hsl(var(--foreground))',
          display: 'inline-flex',
          flexWrap: 'wrap',
          gap: '0.25em',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={wordVariants}>
            {word}
          </motion.span>
        ))}
      </motion.span>
    )
  },
  example: {
    name: 'Blur Reveal Text',
    description: 'Text that reveals word by word with a blur effect',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'blur-reveal-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'blur-reveal-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['text-1', 'text-2'] },
            },
            {
              id: 'text-1',
              component: {
                type: 'BlurRevealText',
                id: 'text-1',
                content: 'Welcome to the future of UI',
                style: 'h2',
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'BlurRevealText',
                id: 'text-2',
                content: 'This text fades in from the right',
                direction: 'right',
                delay: 1,
              },
            },
          ],
        },
      },
    ],
  },
}
