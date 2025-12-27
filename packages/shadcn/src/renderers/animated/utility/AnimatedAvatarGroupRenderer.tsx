import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Avatar {
  src?: string
  alt?: string
  fallback: string
}

interface AnimatedAvatarGroupComponent {
  type: 'AnimatedAvatarGroup'
  id: string
  avatars: Avatar[]
  maxVisible?: number
  size?: 'sm' | 'md' | 'lg'
  animation?: 'expand' | 'pop' | 'slide'
}

const sizeStyles = {
  sm: { width: 32, height: 32, fontSize: 12 },
  md: { width: 40, height: 40, fontSize: 14 },
  lg: { width: 48, height: 48, fontSize: 16 },
}

export const AnimatedAvatarGroupRenderer: A2UIRenderer<AnimatedAvatarGroupComponent> = {
  type: 'AnimatedAvatarGroup',
  render: ({ component }: RendererProps<AnimatedAvatarGroupComponent>) => {
    const [isHovered, setIsHovered] = useState(false)
    const maxVisible = component.maxVisible || 4
    const size = component.size || 'md'
    const animation = component.animation || 'expand'

    const { width, height, fontSize } = sizeStyles[size]
    const visibleAvatars = component.avatars.slice(0, maxVisible)
    const remainingCount = component.avatars.length - maxVisible

    const getOverlap = () => {
      if (animation === 'expand') {
        return isHovered ? 0 : -width / 3
      }
      return -width / 3
    }

    const overlap = getOverlap()

    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {visibleAvatars.map((avatar, index) => (
          <motion.div
            key={`avatar-${component.id}-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              marginLeft: index === 0 ? 0 : overlap,
              zIndex: isHovered ? index : visibleAvatars.length - index,
            }}
            whileHover={animation === 'pop' ? { scale: 1.2, zIndex: 100 } : undefined}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: animation === 'slide' ? index * 0.05 : 0,
            }}
            style={{
              width,
              height,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid hsl(var(--background))',
              backgroundColor: 'hsl(var(--muted))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize,
              fontWeight: 500,
              color: 'hsl(var(--muted-foreground))',
              cursor: 'pointer',
            }}
          >
            {avatar.src ? (
              <img
                src={avatar.src}
                alt={avatar.alt || avatar.fallback}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              avatar.fallback
            )}
          </motion.div>
        ))}

        {remainingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              marginLeft: overlap,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: animation === 'slide' ? visibleAvatars.length * 0.05 : 0,
            }}
            style={{
              width,
              height,
              borderRadius: '50%',
              border: '2px solid hsl(var(--background))',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: fontSize - 2,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            +{remainingCount}
          </motion.div>
        )}
      </div>
    )
  },
  example: {
    name: 'Animated Avatar Group',
    description: 'Stacked avatars with interactive animations',
    category: 'animated',
    messages: [
      { createSurface: { surfaceId: 'avatar-group-example', root: 'col-1' } },
      {
        updateComponents: {
          surfaceId: 'avatar-group-example',
          components: [
            {
              id: 'col-1',
              component: { type: 'Column', id: 'col-1', children: ['group-1', 'group-2'] },
            },
            {
              id: 'group-1',
              component: {
                type: 'AnimatedAvatarGroup',
                id: 'group-1',
                avatars: [
                  { fallback: 'AB' },
                  { fallback: 'CD' },
                  { fallback: 'EF' },
                  { fallback: 'GH' },
                  { fallback: 'IJ' },
                ],
                maxVisible: 3,
                animation: 'expand',
              },
            },
            {
              id: 'group-2',
              component: {
                type: 'AnimatedAvatarGroup',
                id: 'group-2',
                avatars: [{ fallback: 'JD' }, { fallback: 'AS' }, { fallback: 'MK' }],
                size: 'lg',
                animation: 'pop',
              },
            },
          ],
        },
      },
    ],
  },
}
