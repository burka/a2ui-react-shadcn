import type { ImageComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { useState } from 'react'
import { cn } from '../../lib/utils.js'

export const ImageRenderer: A2UIRenderer<ImageComponent> = {
  type: 'Image',
  render: ({ component }: RendererProps<ImageComponent>) => {
    const { url, alt = 'Image' } = component
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    if (hasError) {
      return (
        <div
          className={cn(
            'flex items-center justify-center rounded-md border border-destructive bg-destructive/10 p-4',
            'text-sm text-destructive',
          )}
        >
          <span>Failed to load image</span>
        </div>
      )
    }

    return (
      <div className="relative">
        {isLoading && (
          <div
            className={cn(
              'absolute inset-0 animate-pulse rounded-md bg-muted',
              'flex items-center justify-center',
            )}
          >
            <span className="text-xs text-muted-foreground">Loading...</span>
          </div>
        )}
        <img
          src={url}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'max-w-full rounded-md object-contain transition-opacity',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
        />
      </div>
    )
  },
  example: {
    name: 'Image',
    description: 'Renders images with loading state and error handling',
    category: 'display',
    messages: [
      {
        createSurface: {
          surfaceId: 'image-demo',
          root: 'root',
        },
      },
      {
        updateComponents: {
          surfaceId: 'image-demo',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['title', 'image-valid', 'caption'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Image Example',
                style: 'h3',
              },
            },
            {
              id: 'image-valid',
              component: {
                type: 'Image',
                id: 'image-valid',
                url: 'https://picsum.photos/400/200',
                alt: 'Beautiful landscape photograph',
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'Image with loading state and error handling',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
