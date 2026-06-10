import { TrendingUp, HeartHandshake, Target, PieChart } from 'lucide-react'
import { Card } from './Card'
import { Badge } from './Badge'
import { NetWorthChart } from './NetWorthChart'
import {
  BASE_NET_WORTH,
  PRIOR_ADVISOR_VALUE,
  TASK_VALUES,
  formatCurrency,
} from '../data/financialMetrics'
import type { Task } from '../types'
import { advisor } from '../data/mockData'

interface FinancialProgressProps {
  tasks: Task[]
}

export function FinancialProgress({ tasks }: FinancialProgressProps) {
  const displayTasks = tasks.filter((t) => t.approved || !t.aiSuggested)
  const taskList = displayTasks.length ? displayTasks : tasks

  const contributions = taskList
    .map((task) => ({
      task,
      ...TASK_VALUES[task.id],
      completed: task.status === 'completed',
    }))
    .filter((c) => c.value !== undefined)

  const completedValue = contributions
    .filter((c) => c.completed)
    .reduce((sum, c) => sum + c.value, 0)

  const pendingValue = contributions
    .filter((c) => !c.completed)
    .reduce((sum, c) => sum + c.value, 0)

  const totalTaskValue = contributions.reduce((sum, c) => sum + c.value, 0)
  const currentNetWorth = BASE_NET_WORTH + completedValue
  const projectedNetWorth = BASE_NET_WORTH + totalTaskValue
  const advisorValueAdded = PRIOR_ADVISOR_VALUE + completedValue

  const maxContribution = Math.max(...contributions.map((c) => c.value), 1)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-jump-muted mb-1">Current net worth</p>
          <p className="text-xl font-semibold text-jump-text">
            {formatCurrency(currentNetWorth)}
          </p>
          <p className="text-xs text-jump-green mt-1">
            {completedValue > 0
              ? `+${formatCurrency(completedValue)} from your actions`
              : 'Complete tasks to see impact'}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-jump-muted mb-1">Projected net worth</p>
          <p className="text-xl font-semibold text-jump-text">
            {formatCurrency(projectedNetWorth)}
          </p>
          <p className="text-xs text-jump-muted mt-1">
            If all {taskList.length} recommended tasks completed
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-jump-muted mb-1">Remaining opportunity</p>
          <p className="text-xl font-semibold text-jump-green">
            +{formatCurrency(pendingValue)}
          </p>
          <p className="text-xs text-jump-muted mt-1">
            {taskList.filter((t) => t.status !== 'completed').length} tasks to go
          </p>
        </Card>

        <Card className="p-4 bg-jump-green-light border-jump-green/20">
          <p className="text-xs text-jump-body mb-1">Advisor relationship value</p>
          <p className="text-xl font-semibold text-jump-text">
            {formatCurrency(advisorValueAdded)}
          </p>
          <p className="text-xs text-jump-muted mt-1">Estimated value added to date</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-jump-body" />
          <h3 className="font-semibold text-jump-text">Net Worth Over Time</h3>
        </div>
        <NetWorthChart
          currentValue={currentNetWorth}
          projectedValue={projectedNetWorth}
        />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieChart className="w-5 h-5 text-jump-body" />
            <h3 className="font-semibold text-jump-text">Action Contributions</h3>
          </div>
          <p className="text-sm text-jump-muted mb-5">
            How much each completed action has contributed to your wealth — and what's
            still available from pending tasks.
          </p>

          <div className="space-y-4">
            {contributions.map((c) => (
              <div key={c.task.id}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-jump-body truncate pr-2">{c.label}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`font-medium ${c.completed ? 'text-jump-text' : 'text-jump-muted'}`}
                    >
                      {c.completed ? '+' : '~'}
                      {formatCurrency(c.value)}
                    </span>
                    {c.completed ? (
                      <Badge variant="success" size="sm">Done</Badge>
                    ) : (
                      <Badge variant="default" size="sm">Pending</Badge>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-jump-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      c.completed ? 'bg-jump-green' : 'bg-jump-border'
                    }`}
                    style={{ width: `${(c.value / maxContribution) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {completedValue === 0 && (
            <p className="text-xs text-jump-muted mt-4 pt-4 border-t border-jump-border">
              Complete your first action item to start tracking real contributions.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Target className="w-5 h-5 text-jump-body" />
            <h3 className="font-semibold text-jump-text">Projected Net Worth</h3>
          </div>
          <p className="text-sm text-jump-muted mb-6">
            Your wealth trajectory if you complete all advisor-recommended actions.
          </p>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-jump-muted">Today</span>
                <span className="font-semibold text-jump-text">
                  {formatCurrency(currentNetWorth)}
                </span>
              </div>
              <div className="h-3 bg-jump-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-jump-text rounded-full"
                  style={{
                    width: `${(currentNetWorth / projectedNetWorth) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-jump-muted">If all tasks completed</span>
                <span className="font-semibold text-jump-green">
                  {formatCurrency(projectedNetWorth)}
                </span>
              </div>
              <div className="h-3 bg-jump-surface rounded-full overflow-hidden">
                <div className="h-full bg-jump-green rounded-full w-full opacity-40" />
                <div
                  className="h-full bg-jump-green rounded-full -mt-3"
                  style={{
                    width: `${(currentNetWorth / projectedNetWorth) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-4 bg-jump-surface rounded-lg">
              <p className="text-sm text-jump-body">
                <span className="font-medium text-jump-text">
                  +{formatCurrency(projectedNetWorth - currentNetWorth)}
                </span>{' '}
                additional wealth potential from completing your remaining action items
                over the next 5 years.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-jump-nav-active flex items-center justify-center flex-shrink-0">
            <HeartHandshake className="w-5 h-5 text-jump-blue" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-jump-text mb-1">
              Estimated Value of Your Advisor Relationship
            </h3>
            <p className="text-sm text-jump-muted mb-4">
              Jump attributes financial outcomes to both completed actions and ongoing
              advisory guidance from {advisor.name}'s recommendations over time.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-3 border border-jump-border rounded-lg">
                <p className="text-xs text-jump-muted">Prior recommendations</p>
                <p className="text-lg font-semibold text-jump-text mt-0.5">
                  {formatCurrency(PRIOR_ADVISOR_VALUE)}
                </p>
                <p className="text-xs text-jump-muted mt-1">Last 12 months</p>
              </div>
              <div className="p-3 border border-jump-border rounded-lg">
                <p className="text-xs text-jump-muted">Current action plan</p>
                <p className="text-lg font-semibold text-jump-green mt-0.5">
                  +{formatCurrency(completedValue)}
                </p>
                <p className="text-xs text-jump-muted mt-1">
                  {contributions.filter((c) => c.completed).length} tasks completed
                </p>
              </div>
              <div className="p-3 bg-jump-green-light border border-jump-green/20 rounded-lg">
                <p className="text-xs text-jump-body">Total estimated value</p>
                <p className="text-lg font-semibold text-jump-text mt-0.5">
                  {formatCurrency(advisorValueAdded)}
                </p>
                <p className="text-xs text-jump-muted mt-1">Attributed to advisory relationship</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
