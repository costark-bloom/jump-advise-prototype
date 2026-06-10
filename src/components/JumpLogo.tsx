import { Link } from 'react-router-dom'

export function JumpLogo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full bg-jump-text flex-shrink-0" />
      <span className="font-semibold text-jump-text text-[17px] tracking-tight">
        Jump
      </span>
    </Link>
  )
}
