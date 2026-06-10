import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { Sidebar } from './Sidebar'
import { JumpLogo } from './JumpLogo'
import { Avatar } from './Avatar'

interface Breadcrumb {
  label: string
  to?: string
}

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface LayoutProps {
  children: React.ReactNode
  role?: 'advisor' | 'client' | 'landing'
  breadcrumbs?: Breadcrumb[]
  title?: string
  subtitle?: string
  tabs?: Tab[]
  activeTab?: string
  onTabChange?: (id: string) => void
  rightPanel?: React.ReactNode
  avatars?: { initials: string; color?: 'blue' | 'green' }[]
  headerActions?: React.ReactNode
  backTo?: string
  backLabel?: string
  fullWidth?: boolean
}

export function Layout({
  children,
  role = 'landing',
  breadcrumbs,
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  rightPanel,
  avatars,
  headerActions,
  fullWidth,
}: LayoutProps) {
  if (role === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-jump-border px-8 py-4 flex items-center justify-between">
          <JumpLogo />
          <span className="text-xs text-jump-muted bg-jump-surface px-3 py-1.5 rounded-full">
            Advise MVP Prototype
          </span>
        </header>
        <main className="max-w-5xl mx-auto px-8 py-10">{children}</main>
      </div>
    )
  }

  if (role === 'client') {
    return (
      <div className="min-h-screen bg-jump-surface flex flex-col">
        <header className="bg-white border-b border-jump-border px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <JumpLogo to="/client" />
            <span className="text-jump-muted text-sm">/</span>
            <span className="text-sm font-medium text-jump-text">Advise</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/advisor"
              className="text-xs text-jump-muted hover:text-jump-green transition-colors"
            >
              Switch to Advisor view
            </Link>
            <Link to="/" className="text-xs text-jump-muted hover:text-jump-body">
              Demo home
            </Link>
            <Avatar initials="MP" color="green" />
          </div>
        </header>

        {(title || subtitle) && (
          <div className="bg-white border-b border-jump-border px-6 py-5">
            <div className="max-w-5xl mx-auto">
              {title && (
                <h1 className="text-xl font-semibold text-jump-text">{title}</h1>
              )}
              {subtitle && (
                <p className="text-jump-muted text-sm mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
        )}

        <main className="flex-1 px-6 py-6">
          <div className={clsx('mx-auto', fullWidth ? 'max-w-6xl' : 'max-w-5xl')}>
            {children}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 flex flex-col min-w-0 overflow-auto">
            <div className="px-8 pt-6 pb-0">
              {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1.5 text-sm text-jump-muted mb-4">
                  {breadcrumbs.map((crumb, i) => (
                    <span key={crumb.label} className="flex items-center gap-1.5">
                      {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                      {crumb.to ? (
                        <Link
                          to={crumb.to}
                          className="hover:text-jump-text transition-colors"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-jump-text">{crumb.label}</span>
                      )}
                    </span>
                  ))}
                </nav>
              )}

              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  {title && (
                    <h1 className="text-2xl font-semibold text-jump-text tracking-tight">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-jump-muted text-sm mt-1">{subtitle}</p>
                  )}
                  {avatars && avatars.length > 0 && (
                    <div className="flex items-center gap-2 mt-3">
                      {avatars.map((a) => (
                        <Avatar
                          key={a.initials}
                          initials={a.initials}
                          color={a.color ?? 'blue'}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {headerActions}
              </div>

              {tabs && tabs.length > 0 && (
                <div className="flex items-center gap-1 border-b border-jump-border -mb-px">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange?.(tab.id)}
                      className={clsx(
                        'flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors',
                        activeTab === tab.id
                          ? 'border-jump-text text-jump-text font-medium bg-jump-surface rounded-t-lg'
                          : 'border-transparent text-jump-muted hover:text-jump-body'
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <main className="flex-1 px-8 py-6">{children}</main>
          </div>

          {rightPanel}
        </div>
      </div>
    </div>
  )
}
