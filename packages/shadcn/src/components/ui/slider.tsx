import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import { cn } from '../../lib/utils.js'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
      style={{ backgroundColor: 'hsl(var(--muted))' }}
    >
      <SliderPrimitive.Range
        className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        style={{ backgroundColor: 'hsl(var(--primary))' }}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block size-5 shrink-0 rounded-full border-2 shadow-md transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
      style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--primary))',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
