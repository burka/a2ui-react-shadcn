'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils.js'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, defaultChecked, ...props }, ref) => {
  // Track internal state for styling
  const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false)

  // Update internal state when controlled value changes
  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked === true || checked === 'indeterminate')
    }
  }, [checked])

  const handleCheckedChange = (value: CheckboxPrimitive.CheckedState) => {
    if (checked === undefined) {
      // Uncontrolled mode
      setIsChecked(value === true || value === 'indeterminate')
    }
    props.onCheckedChange?.(value)
  }

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      style={{
        backgroundColor: isChecked ? 'hsl(var(--primary))' : 'transparent',
        borderColor: isChecked ? 'hsl(var(--primary))' : 'hsl(var(--input))',
        color: 'hsl(var(--primary-foreground))',
      }}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
