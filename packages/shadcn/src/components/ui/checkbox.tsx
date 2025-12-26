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
        'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <Check className="size-3.5" strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
      <style>{`
        [data-slot="checkbox"] {
          border-color: hsl(var(--border));
          background-color: transparent;
        }
        [data-slot="checkbox"][data-state="checked"] {
          background-color: hsl(var(--primary));
          border-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }
        [data-slot="checkbox"]:focus-visible {
          border-color: hsl(var(--ring));
          box-shadow: 0 0 0 3px hsl(var(--ring) / 0.3);
        }
      `}</style>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
