import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface AnimatedCopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
  variant?: 'default' | 'outline' | 'ghost' | 'icon'
  showIcon?: boolean
  className?: string
}

export function AnimatedCopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  variant = 'default',
  showIcon = true,
  className = '',
}: AnimatedCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-bg-tertiary)]'
      case 'ghost':
        return 'bg-transparent hover:bg-[var(--color-bg-tertiary)]'
      case 'icon':
        return 'p-2 bg-transparent hover:bg-[var(--color-bg-tertiary)]'
      default:
        return 'bg-[var(--color-accent)] text-white hover:opacity-90'
    }
  }

  const isIconOnly = variant === 'icon'

  return (
    <motion.button
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors ${isIconOnly ? '' : 'px-4 py-2'} ${getVariantStyles()} ${className}`}
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      title={copied ? copiedLabel : label}
    >
      <AnimatePresence mode="wait">
        {showIcon && (
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-[var(--color-text-secondary)]" />
            )}
          </motion.span>
        )}
      </AnimatePresence>

      {!isIconOnly && (
        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? 'copied' : 'copy'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm"
          >
            {copied ? copiedLabel : label}
          </motion.span>
        </AnimatePresence>
      )}
    </motion.button>
  )
}
