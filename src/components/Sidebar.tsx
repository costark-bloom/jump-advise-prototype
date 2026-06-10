import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Calendar,
  Users,
  ListChecks,
  BarChart3,
  FileText,
  HelpCircle,
  Search,
  Plus,
} from 'lucide-react'
import clsx from 'clsx'
import { JumpLogo } from './JumpLogo'

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Meetings', icon: Calendar, path: '/advisor', match: ['/advisor'] },
  { label: 'Contacts', icon: Users, path: '#' },
  {
    label: 'Actions',
    icon: ListChecks,
    path: '/advisor/tasks',
    match: ['/advisor/tasks', '/advisor/invite'],
  },
  { label: 'Insights', icon: BarChart3, path: '#' },
  { label: 'Reports', icon: FileText, path: '#' },
  { label: 'Help', icon: HelpCircle, path: '#' },
]

export function Sidebar() {
  const location = useLocation()

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.match) {
      return item.match.some((p) => location.pathname.startsWith(p))
    }
    return location.pathname === item.path
  }

  return (
    <aside className="w-[220px] flex-shrink-0 border-r border-jump-border bg-white flex flex-col h-screen sticky top-0">
      <div className="px-4 pt-5 pb-4">
        <JumpLogo />
      </div>

      <div className="px-3 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jump-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-jump-border rounded-lg bg-white text-jump-body placeholder:text-jump-muted"
          />
        </div>
      </div>

      <div className="px-3 mb-5">
        <button className="w-full flex items-center justify-center gap-2 bg-jump-green hover:bg-jump-green-hover text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          New Meeting
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item)
          const Icon = item.icon
          const className = clsx(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
            active
              ? 'bg-jump-nav-active text-jump-text font-medium'
              : 'text-jump-body hover:bg-jump-surface'
          )

          if (item.path === '#') {
            return (
              <span key={item.label} className={clsx(className, 'cursor-default opacity-60')}>
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                {item.label}
              </span>
            )
          }

          return (
            <Link key={item.label} to={item.path} className={className}>
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-jump-border">
        <Link
          to="/client"
          className="text-xs text-jump-muted hover:text-jump-green transition-colors"
        >
          Switch to Client view →
        </Link>
      </div>
    </aside>
  )
}
