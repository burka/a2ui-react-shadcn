import { cn } from '../../lib/utils.js'

interface FieldLabelProps {
  htmlFor: string
  children: React.ReactNode
  variant?: 'block' | 'inline'
  disabled?: boolean
  className?: string
}

export function FieldLabel({
  htmlFor,
  children,
  variant = 'block',
  disabled = false,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium',
        variant === 'block' && 'block',
        variant === 'inline' && 'leading-none',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && variant === 'inline' && 'cursor-pointer',
        className,
      )}
      style={{ color: 'hsl(var(--foreground))' }}
    >
      {children}
    </label>
  )
}
