import { Mail, Sparkles, CheckCircle2, Zap } from 'lucide-react'
import { Card } from './Card'
import { Avatar } from './Avatar'

interface Automation {
  id: string
  title: string
  status: 'complete' | 'pending'
  icon: 'mail' | 'sparkles' | 'check'
  contactInitials?: string
}

interface AutomationsPanelProps {
  automations: Automation[]
  actionLabel?: string
  onAction?: () => void
}

const iconMap = {
  mail: Mail,
  sparkles: Sparkles,
  check: CheckCircle2,
}

export function AutomationsPanel({
  automations,
  actionLabel,
  onAction,
}: AutomationsPanelProps) {
  return (
    <aside className="w-[280px] flex-shrink-0 border-l border-jump-border bg-white p-5 space-y-4">
      <div className="flex items-center gap-2 px-3 py-2 border border-jump-border rounded-full text-sm text-jump-muted">
        <Zap className="w-4 h-4" />
        <span>Automations</span>
      </div>

      <h2 className="text-sm font-semibold text-jump-text px-1">Automations</h2>

      <div className="space-y-3">
        {automations.map((auto) => {
          const Icon = iconMap[auto.icon]
          return (
            <Card key={auto.id} className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    auto.status === 'complete'
                      ? 'bg-jump-green-light text-jump-green'
                      : 'bg-violet-50 text-violet-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-jump-text leading-snug">{auto.title}</p>
                  {auto.status === 'complete' && auto.contactInitials && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar initials={auto.contactInitials} color="green" size="sm" />
                      <CheckCircle2 className="w-4 h-4 text-jump-green" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="w-full text-sm text-jump-body border border-jump-border rounded-full py-2.5 hover:bg-jump-surface transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </aside>
  )
}
