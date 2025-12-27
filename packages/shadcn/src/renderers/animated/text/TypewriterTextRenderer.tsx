import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterTextComponent {
  type: 'TypewriterText'
  id: string
  content: string
  style?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'caption'
  speed?: number
  cursor?: boolean
  cursorChar?: string
  loop?: boolean
  delayBetweenLoops?: number
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

export const TypewriterTextRenderer: A2UIRenderer<TypewriterTextComponent> = {
  type: 'TypewriterText',
  render: ({ component }: RendererProps<TypewriterTextComponent>) => {
    const [displayText, setDisplayText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    const speed = component.speed || 50
    const cursorChar = component.cursorChar || '|'
    const showCursorProp = component.cursor !== false

    useEffect(() => {
      let currentIndex = 0
      let isDeleting = false
      let timeout: ReturnType<typeof setTimeout>

      const typeChar = () => {
        if (!isDeleting) {
          if (currentIndex <= component.content.length) {
            setDisplayText(component.content.slice(0, currentIndex))
            currentIndex++
            timeout = setTimeout(typeChar, speed)
          } else if (component.loop) {
            timeout = setTimeout(() => {
              isDeleting = true
              typeChar()
            }, component.delayBetweenLoops || 2000)
          }
        } else {
          if (currentIndex > 0) {
            currentIndex--
            setDisplayText(component.content.slice(0, currentIndex))
            timeout = setTimeout(typeChar, speed / 2)
          } else {
            isDeleting = false
            timeout = setTimeout(typeChar, 500)
          }
        }
      }

      typeChar()

      return () => clearTimeout(timeout)
    }, [component.content, speed, component.loop, component.delayBetweenLoops])

    useEffect(() => {
      if (!showCursorProp) return

      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 530)

      return () => clearInterval(cursorInterval)
    }, [showCursorProp])

    const className = styleClasses[component.style || 'body']

    return (
      <span className={className} style={{ color: 'hsl(var(--foreground))' }}>
        {displayText}
        {showCursorProp && (
          <motion.span
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ color: 'hsl(var(--primary))' }}
          >
            {cursorChar}
          </motion.span>
        )}
      </span>
    )
  },
  example: {
    name: 'Typewriter Text',
    description: 'Text that types out character by character',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'typewriter-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'typewriter-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['text-1', 'text-2'] },
            },
            {
              id: 'text-1',
              component: {
                type: 'TypewriterText',
                id: 'text-1',
                content: 'Hello, World!',
                style: 'h2',
                speed: 80,
              },
            },
            {
              id: 'text-2',
              component: {
                type: 'TypewriterText',
                id: 'text-2',
                content: 'This text loops forever...',
                loop: true,
                speed: 60,
              },
            },
          ],
        },
      },
    ],
  },
}
