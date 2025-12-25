import type { AudioPlayerComponent } from 'a2ui-shadcn-ui-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-shadcn-ui-react'
import { useState } from 'react'
import { cn } from '../../lib/utils.js'

export const AudioPlayerRenderer: A2UIRenderer<AudioPlayerComponent> = {
  type: 'AudioPlayer',
  render: ({ component }: RendererProps<AudioPlayerComponent>) => {
    const { url, autoplay = false, controls = true, loop = false } = component
    const [hasError, setHasError] = useState(false)

    const handleError = () => {
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
          <span>Failed to load audio</span>
        </div>
      )
    }

    return (
      // biome-ignore lint/a11y/useMediaCaption: Captions are optional for audio players and would be provided via separate track URL if needed
      <audio
        src={url}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        onError={handleError}
        className="w-full"
      >
        Your browser does not support the audio element.
      </audio>
    )
  },
  example: {
    name: 'Audio Player',
    description: 'HTML5 audio player with controls',
    category: 'display',
    messages: [
      {
        createSurface: {
          surfaceId: 'audio-example',
          root: 'root',
        },
      },
      {
        updateComponents: {
          surfaceId: 'audio-example',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['title', 'audio', 'caption'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Audio Player Example',
                style: 'h3',
              },
            },
            {
              id: 'audio',
              component: {
                type: 'AudioPlayer',
                id: 'audio',
                url: 'https://www.w3schools.com/html/horse.mp3',
                controls: true,
                loop: false,
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'HTML5 audio with controls and error handling',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
