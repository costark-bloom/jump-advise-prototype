import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Circle,
  Clock,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ListChecks,
  LineChart,
} from 'lucide-react'
import clsx from 'clsx'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { TaskCard } from '../components/TaskCard'
import { Avatar } from '../components/Avatar'
import { FinancialProgress } from '../components/FinancialProgress'
import { useApp } from '../context/AppContext'
import { client, advisor } from '../data/mockData'
import {
  BASE_NET_WORTH,
  PRIOR_ADVISOR_VALUE,
  TASK_VALUES,
  formatCurrency,
} from '../data/financialMetrics'

type ClientTab = 'actions' | 'progress'

export function ClientDashboard() {
  const navigate = useNavigate()
  const { tasks } = useApp()
  const [activeTab, setActiveTab] = useState<ClientTab>('actions')

  const displayTasks = tasks.filter((t) => t.approved || !t.aiSuggested)
  const taskList = displayTasks.length ? displayTasks : tasks

  const completed = taskList.filter((t) => t.status === 'completed').length
  const inProgress = taskList.filter((t) => t.status === 'in_progress').length
  const pending = taskList.filter((t) => t.status === 'pending').length

  const completedValue = taskList
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + (TASK_VALUES[t.id]?.value ?? 0), 0)

  const totalTaskValue = taskList.reduce(
    (sum, t) => sum + (TASK_VALUES[t.id]?.value ?? 0),
    0
  )

  const nextTask = taskList.find(
    (t) => t.status === 'pending' || t.status === 'in_progress'
  )

  const tabs = [
    { id: 'actions' as const, label: 'Action Items', icon: ListChecks },
    { id: 'progress' as const, label: 'Financial Progress', icon: LineChart },
  ]

  return (
    <Layout
      role="client"
      title={`Welcome back, ${client.name.split(' ')[0]}`}
      subtitle={`Your action plan from ${advisor.name}`}
      fullWidth
    >
      <div className="flex items-center gap-1 border-b border-jump-border mb-6 -mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors',
              activeTab === tab.id
                ? 'border-jump-text text-jump-text font-medium'
                : 'border-transparent text-jump-muted hover:text-jump-body'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'progress' ? (
        <FinancialProgress tasks={tasks} />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {nextTask && (
              <div
                role="button"
                tabIndex={0}
                className="p-5 rounded-lg bg-jump-text text-white cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => navigate(`/client/task/${nextTask.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/client/task/${nextTask.id}`)
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-jump-green" />
                  <span className="text-sm font-medium text-white/70">
                    Recommended next step
                  </span>
                </div>
                <h2 className="font-semibold text-lg mb-1 text-white">{nextTask.title}</h2>
                <p className="text-white/60 text-sm">
                  Due {nextTask.dueDate} · {nextTask.steps.length} steps with AI guidance
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium bg-jump-green text-white px-3 py-1.5 rounded-lg">
                  Start now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-jump-text">Your Action Items</h2>
                <span className="text-sm text-jump-muted">
                  {taskList.length} tasks assigned
                </span>
              </div>

              <div className="space-y-3">
                {taskList.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => navigate(`/client/task/${task.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card
              className="p-5 cursor-pointer hover:border-jump-muted/40 transition-colors"
              onClick={() => setActiveTab('progress')}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-jump-text text-sm">Financial Snapshot</h3>
                <span className="text-xs text-jump-green font-medium">View all →</span>
              </div>
              <p className="text-2xl font-semibold text-jump-text">
                {formatCurrency(BASE_NET_WORTH + completedValue)}
              </p>
              <p className="text-xs text-jump-muted mt-1">Current net worth</p>
              <div className="mt-3 pt-3 border-t border-jump-border grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-jump-muted">If all tasks done</p>
                  <p className="font-semibold text-jump-green mt-0.5">
                    {formatCurrency(BASE_NET_WORTH + totalTaskValue)}
                  </p>
                </div>
                <div>
                  <p className="text-jump-muted">Advisor value</p>
                  <p className="font-semibold text-jump-text mt-0.5">
                    {formatCurrency(PRIOR_ADVISOR_VALUE + completedValue)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-semibold text-jump-text text-sm mb-4">Task Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-jump-body">
                    <CheckCircle2 className="w-4 h-4 text-jump-green" />
                    Completed
                  </span>
                  <span className="font-semibold text-jump-text">{completed}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-jump-body">
                    <Clock className="w-4 h-4 text-jump-blue" />
                    In progress
                  </span>
                  <span className="font-semibold text-jump-text">{inProgress}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-jump-body">
                    <Circle className="w-4 h-4 text-jump-border" />
                    Not started
                  </span>
                  <span className="font-semibold text-jump-text">{pending}</span>
                </div>
              </div>

              <div className="mt-4 h-1.5 bg-jump-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-jump-green rounded-full transition-all"
                  style={{
                    width: `${taskList.length ? (completed / taskList.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </Card>

            <Card className="p-5 border-dashed">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-jump-body" />
                <h3 className="font-semibold text-jump-text text-sm">Ask Jump AI</h3>
              </div>
              <p className="text-xs text-jump-muted mb-3">
                Have a question about any task? AI can explain the "why" behind your
                advisor's recommendations.
              </p>
              <div className="bg-jump-surface rounded-lg px-3 py-2 text-sm text-jump-muted border border-jump-border">
                "Why should I convert to Roth now?"
              </div>
            </Card>

            <Card className="p-4 bg-jump-surface">
              <div className="flex items-center gap-2">
                <Avatar initials="SC" color="blue" size="sm" />
                <p className="text-xs text-jump-muted">
                  <span className="font-medium text-jump-text">Your advisor: </span>
                  {advisor.name}
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  )
}
