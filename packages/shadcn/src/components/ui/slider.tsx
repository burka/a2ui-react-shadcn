'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '../../lib/utils.js'

// shadcn/ui v4 Slider - https://ui.shadcn.com/docs/components/slider
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
      <style>{`
        /* Track - the unfilled part */
        [data-slot="slider-track"] {
          background-color: hsl(var(--border));
        }
        /* Range - the filled part */
        [data-slot="slider-range"] {
          background-color: hsl(var(--foreground));
        }
        /* Thumb */
        [data-slot="slider-thumb"] {
          background-color: hsl(var(--background));
          border-color: hsl(var(--foreground));
        }
        [data-slot="slider-thumb"]:hover {
          box-shadow: 0 0 0 4px hsl(var(--ring) / 0.3);
        }
        [data-slot="slider-thumb"]:focus-visible {
          box-shadow: 0 0 0 4px hsl(var(--ring) / 0.5);
        }
      `}</style>
    </SliderPrimitive.Root>
  )
}

export { Slider }
