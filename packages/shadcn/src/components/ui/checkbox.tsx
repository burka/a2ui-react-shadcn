'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils.js'

// shadcn/ui v4 Checkbox - https://ui.shadcn.com/docs/components/checkbox
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        // Use data attributes for state styling
        'data-[state=checked]:border-transparent',
        className,
      )}
      style={{
        borderColor: 'hsl(var(--input))',
        // These will be overridden by data-state styles below
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
        style={{ color: 'hsl(var(--primary-foreground))' }}
      >
        <Check className="size-3.5" strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
      <style>{`
        [data-slot="checkbox"][data-state="checked"] {
          background-color: hsl(var(--primary));
          border-color: hsl(var(--primary));
        }
        [data-slot="checkbox"][data-state="unchecked"] {
          background-color: transparent;
        }
        [data-slot="checkbox"]:focus-visible {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 3px hsl(var(--ring) / 0.5);
        }
      `}</style>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
