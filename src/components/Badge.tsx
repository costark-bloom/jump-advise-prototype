import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'ai' | 'success' | 'warning' | 'info'
  size?: 'sm' | 'md'
}

const variants = {
  default: 'bg-jump-surface text-jump-body',
  ai: 'bg-violet-50 text-violet-700',
  success: 'bg-jump-green-light text-jump-green',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-jump-nav-active text-jump-blue',
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-md',
        variants[variant],
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'
      )}
    >
      {children}
    </span>
  )
}
