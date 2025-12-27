import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  Flame,
  Heart,
  HelpCircle,
  Home,
  Mail,
  Menu,
  Minus,
  Moon,
  Pause,
  Phone,
  Play,
  Plus,
  Search,
  Settings,
  Square,
  Star,
  Sun,
  User,
  X,
  Zap,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface MorphingIconComponent {
  type: 'MorphingIcon'
  id: string
  icons: string[]
  trigger?: 'hover' | 'click' | 'auto'
  interval?: number
  size?: number
  color?: string
}

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Moon,
  Cloud,
  Play,
  Pause,
  Square,
  Heart,
  Star,
  Zap,
  Flame,
  HelpCircle,
  Check,
  X,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  User,
  Mail,
  Phone,
  Search,
  Menu,
  Bell,
}

export const MorphingIconRenderer: A2UIRenderer<MorphingIconComponent> = {
  type: 'MorphingIcon',
  render: ({ component }: RendererProps<MorphingIconComponent>) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const trigger = component.trigger || 'hover'
    const interval = component.interval || 2000
    const size = component.size || 24
    const color = component.color || 'currentColor'

    const icons = component.icons.map((name) => iconMap[name] || HelpCircle)

    const nextIcon = () => {
      setCurrentIndex((prev) => (prev + 1) % icons.length)
    }

    const handleClick = () => {
      if (trigger === 'click') {
        nextIcon()
      }
    }

    const handleHoverStart = () => {
      if (trigger === 'hover') {
        nextIcon()
      }
    }

    useEffect(() => {
      if (trigger === 'auto') {
        const timer = setInterval(nextIcon, interval)
        return () => clearInterval(timer)
      }
      // biome-ignore lint/correctness/useExhaustiveDependencies: nextIcon function is stable and doesn't need to be in deps
    }, [trigger, interval, nextIcon])

    const CurrentIcon = icons[currentIndex] || HelpCircle

    return (
      <motion.div
        onClick={handleClick}
        onHoverStart={handleHoverStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: trigger === 'click' || trigger === 'hover' ? 'pointer' : 'default',
          width: size + 16,
          height: size + 16,
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--muted))',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
          >
            <CurrentIcon size={size} color={color} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  },
  example: {
    name: 'Morphing Icon',
    description: 'Icon that morphs between different icons',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'morphing-icon-example', root: 'row-1' } },
      {
        updateComponents: {
          surfaceId: 'morphing-icon-example',
          components: [
            {
              id: 'row-1',
              component: {
                type: 'Row',
                id: 'row-1',
                distribution: 'spaceAround',
                children: ['icon-1', 'icon-2', 'icon-3'],
              },
            },
            {
              id: 'icon-1',
              component: {
                type: 'MorphingIcon',
                id: 'icon-1',
                icons: ['Sun', 'Moon', 'Cloud'],
                trigger: 'hover',
                size: 28,
              },
            },
            {
              id: 'icon-2',
              component: {
                type: 'MorphingIcon',
                id: 'icon-2',
                icons: ['Play', 'Pause', 'Square'],
                trigger: 'click',
                size: 28,
              },
            },
            {
              id: 'icon-3',
              component: {
                type: 'MorphingIcon',
                id: 'icon-3',
                icons: ['Heart', 'Star', 'Zap', 'Flame'],
                trigger: 'auto',
                interval: 1500,
                size: 28,
              },
            },
          ],
        },
      },
    ],
  },
}
