'use client'

import type { IconButtonComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer } from 'a2ui-shadcn-ui-react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Bookmark,
  Download,
  Edit,
  Heart,
  HelpCircle,
  Menu,
  Minus,
  Plus,
  Search,
  Settings,
  Share,
  Star,
  ThumbsUp,
  Trash,
  X,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  star: Star,
  share: Share,
  bookmark: Bookmark,
  'thumbs-up': ThumbsUp,
  download: Download,
  settings: Settings,
  search: Search,
  menu: Menu,
  x: X,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash,
}

export const IconButtonRenderer: A2UIRenderer<IconButtonComponent> = {
  type: 'icon-button',
  render: ({ component, onAction }) => {
    const {
      icon = 'heart',
      variant = 'default',
      size = 'md',
      animation = 'scale',
      tooltip,
    } = component

    const Icon = iconMap[icon] || HelpCircle

    const sizeStyles = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    }

    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'outline':
          return 'border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--accent))]'
        case 'ghost':
          return 'bg-transparent hover:bg-[hsl(var(--accent))]'
        case 'destructive':
          return 'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive))]/90'
        default:
          return 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90'
      }
    }

    const getAnimationProps = () => {
      switch (animation) {
        case 'rotate':
          return {
            whileHover: { rotate: 180 },
            whileTap: { scale: 0.9 },
            transition: { type: 'spring' as const, stiffness: 200 },
          }
        case 'bounce':
          return {
            whileHover: { y: -4 },
            whileTap: { scale: 0.9 },
            transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
          }
        case 'shake':
          return {
            whileHover: {
              x: [0, -2, 2, -2, 2, 0],
              transition: { duration: 0.4 },
            },
            whileTap: { scale: 0.9 },
          }
        case 'pulse':
          return {
            whileHover: {
              scale: [1, 1.1, 1],
              transition: { duration: 0.3, repeat: Infinity },
            },
            whileTap: { scale: 0.9 },
          }
        case 'scale':
        default:
          return {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
          }
      }
    }

    const animationProps = getAnimationProps()

    return (
      <motion.button
        className={`inline-flex items-center justify-center rounded-lg transition-colors ${sizeStyles[size]} ${getVariantStyles()}`}
        onClick={() => onAction?.({ type: 'click', payload: { icon } })}
        title={tooltip}
        {...animationProps}
      >
        <Icon className={iconSizes[size]} />
      </motion.button>
    )
  },
  example: {
    name: 'Icon Button',
    description: 'Animated icon button with various effects',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'icon-btn-example', root: 'btn-1' } },
      {
        updateComponents: {
          surfaceId: 'icon-btn-example',
          components: [
            {
              id: 'btn-1',
              component: {
                type: 'icon-button',
                id: 'btn-1',
                icon: 'heart',
                variant: 'outline',
                size: 'md',
                animation: 'scale',
                tooltip: 'Like',
              },
            },
          ],
        },
      },
    ],
  },
}
