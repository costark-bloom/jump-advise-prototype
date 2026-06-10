import clsx from 'clsx'

interface AvatarProps {
  initials: string
  color?: 'blue' | 'green' | 'gray'
  size?: 'sm' | 'md'
}

const colors = {
  blue: 'bg-jump-blue text-white',
  green: 'bg-jump-green text-white',
  gray: 'bg-jump-surface text-jump-body',
}

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
}

export function Avatar({ initials, color = 'blue', size = 'sm' }: AvatarProps) {
  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-medium flex-shrink-0',
        colors[color],
        sizes[size]
      )}
    >
      {initials}
    </div>
  )
}
