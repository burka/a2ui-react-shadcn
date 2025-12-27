import type { AudioPlayerComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { useState } from 'react'
import { cn } from '../../lib/utils.js'

export const AudioPlayerRenderer: A2UIRenderer<AudioPlayerComponent> = {
  type: 'AudioPlayer',
  render: ({ component }: RendererProps<AudioPlayerComponent>) => {
    const {
      url,
      autoplay = false,
      controls = true,
      loop = false,
      captionUrl,
      captionLabel = 'Captions',
    } = component
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
      <audio
        src={url}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        onError={handleError}
        className="w-full"
      >
        {captionUrl && (
          <track kind="captions" src={captionUrl} label={captionLabel} default />
        )}
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
