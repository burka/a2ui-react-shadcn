import type { VideoComponent } from 'a2ui-react-core'
import type { A2UIRenderer, RendererProps } from 'a2ui-react-react'
import { useState } from 'react'
import { cn } from '../../lib/utils.js'

export const VideoRenderer: A2UIRenderer<VideoComponent> = {
  type: 'Video',
  render: ({ component }: RendererProps<VideoComponent>) => {
    const {
      url,
      poster,
      autoplay = false,
      controls = true,
      loop = false,
      muted = false,
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
          <span>Failed to load video</span>
        </div>
      )
    }

    return (
      <video
        src={url}
        poster={poster}
        autoPlay={autoplay}
        controls={controls}
        loop={loop}
        muted={muted}
        onError={handleError}
        className="max-w-full rounded-md"
      >
        {captionUrl && (
          <track kind="captions" src={captionUrl} label={captionLabel} default />
        )}
        Your browser does not support the video element.
      </video>
    )
  },
  example: {
    name: 'Video',
    description: 'HTML5 video player with controls',
    category: 'display',
    messages: [
      {
        createSurface: {
          surfaceId: 'video-example',
          root: 'root',
        },
      },
      {
        updateComponents: {
          surfaceId: 'video-example',
          components: [
            {
              id: 'root',
              component: {
                type: 'Column',
                id: 'root',
                distribution: 'packed',
                children: ['title', 'video', 'caption'],
              },
            },
            {
              id: 'title',
              component: {
                type: 'Text',
                id: 'title',
                content: 'Video Player Example',
                style: 'h3',
              },
            },
            {
              id: 'video',
              component: {
                type: 'Video',
                id: 'video',
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                controls: true,
                loop: false,
                muted: false,
              },
            },
            {
              id: 'caption',
              component: {
                type: 'Text',
                id: 'caption',
                content: 'HTML5 video with controls and error handling',
                style: 'caption',
              },
            },
          ],
        },
      },
    ],
  },
}
