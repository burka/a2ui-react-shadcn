import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils.js'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => {
  const isChecked = checked === true || checked === 'indeterminate'

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      className={cn(
        'peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      style={{
        backgroundColor: isChecked ? 'hsl(var(--primary))' : 'transparent',
        borderColor: isChecked ? 'hsl(var(--primary))' : 'hsl(var(--input))',
        color: isChecked ? 'hsl(var(--primary-foreground))' : 'transparent',
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('grid place-content-center text-current')}>
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
