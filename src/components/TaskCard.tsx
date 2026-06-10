import { Calendar, Building2, TrendingUp, ChevronRight, CheckCircle2 } from 'lucide-react'
import clsx from 'clsx'
import { Card } from './Card'
import { Badge } from './Badge'
import type { Task } from '../types'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  showApproval?: boolean
  compact?: boolean
}

const statusConfig = {
  pending: { label: 'Not started', variant: 'default' as const },
  in_progress: { label: 'In progress', variant: 'info' as const },
  completed: { label: 'Completed', variant: 'success' as const },
}

export function TaskCard({ task, onClick, showApproval, compact }: TaskCardProps) {
  const status = statusConfig[task.status]

  return (
    <Card hover={!!onClick} onClick={onClick} className="overflow-hidden">
      <div className={clsx('p-5', compact && 'p-4')}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge variant="default">{task.category}</Badge>
              {task.aiSuggested && <Badge variant="ai">AI Suggested</Badge>}
              {showApproval && task.approved && (
                <Badge variant="success">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              )}
              {!showApproval && <Badge variant={status.variant}>{status.label}</Badge>}
            </div>
            <h3 className="font-semibold text-jump-text text-sm leading-snug">
              {task.title}
            </h3>
            {!compact && (
              <p className="text-jump-muted text-sm mt-1.5 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          {onClick && (
            <ChevronRight className="w-5 h-5 text-jump-muted flex-shrink-0 mt-1" />
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-xs text-jump-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Due: {task.dueDate}
          </span>
          {task.institution && (
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              {task.institution}
            </span>
          )}
        </div>

        {!compact && (
          <div className="mt-3 flex items-start gap-1.5 text-xs text-jump-green bg-jump-green-light rounded-lg px-3 py-2">
            <TrendingUp className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              <span className="font-medium">Expected outcome: </span>
              {task.expectedOutcome}
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}
