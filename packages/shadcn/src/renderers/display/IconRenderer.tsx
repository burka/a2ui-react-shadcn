import type { IconComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import type { LucideIcon } from 'lucide-react'
import { HelpCircle, icons } from 'lucide-react'
import { cn } from '../../lib/utils.js'

export const IconRenderer: A2UIRenderer<IconComponent> = {
  type: 'Icon',
  render: ({ component }: RendererProps<IconComponent>) => {
    const { name } = component

    // Dynamic icon lookup from lucide-react icons object
    const IconComponent = icons[name as keyof typeof icons] as LucideIcon | undefined

    // Fallback for unknown icons
    if (!IconComponent) {
      return (
        <HelpCircle
          className={cn('h-5 w-5 text-muted-foreground')}
          aria-label={`Unknown icon: ${name}`}
        />
      )
    }

    return <IconComponent className={cn('h-5 w-5')} aria-label={name} />
  },
  example: {
    name: 'Icon',
    description: 'Renders icons from lucide-react with dynamic lookup',
    category: 'display',
    messages: [
      {
        createSurface: {
          surfaceId: 'icon-demo',
          root: 'root',
        },
      },
      {
        updateComponents: {
          surfaceId: 'icon-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['title', 'icon-row', 'caption'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Icon Examples',
                style: 'h3',
              },
            },
            {
              id: 'icon-row',
              component: {
                type: 'Row',
                id: 'icon-row',
                distribution: 'packed',
                children: [
                  'icon-home',
                  'icon-search',
                  'icon-settings',
                  'icon-heart',
                  'icon-unknown',
                ],
              },
            },
            {
              id: 'icon-home',
              component: {
                type: 'Icon',
                id: 'icon-home',
                name: 'Home',
              },
            },
            {
              id: 'icon-search',
              component: {
                type: 'Icon',
                id: 'icon-search',
                name: 'Search',
              },
            },
            {
              id: 'icon-settings',
              component: {
                type: 'Icon',
                id: 'icon-settings',
                name: 'Settings',
              },
            },
            {
              id: 'icon-heart',
              component: {
                type: 'Icon',
                id: 'icon-heart',
                name: 'Heart',
              },
            },
            {
              id: 'icon-unknown',
              component: {
                type: 'Icon',
                id: 'icon-unknown',
                name: 'UnknownIconName',
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'Icons from lucide-react (last one shows fallback for unknown icon)',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
