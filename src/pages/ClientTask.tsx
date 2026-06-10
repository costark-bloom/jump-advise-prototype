import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Lightbulb,
  Building2,
  Calendar,
  TrendingUp,
  ChevronRight,
  PartyPopper,
  ArrowLeft,
} from 'lucide-react'
import clsx from 'clsx'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { useApp } from '../context/AppContext'
import { suggestedTasks } from '../data/mockData'

export function ClientTask() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { tasks, updateTaskStatus } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [showCelebration, setShowCelebration] = useState(false)

  const task =
    tasks.find((t) => t.id === taskId) ||
    suggestedTasks.find((t) => t.id === taskId)

  if (!task) {
    return (
      <Layout role="client" title="Task not found">
        <p className="text-jump-muted">This task doesn't exist.</p>
        <Link to="/client" className="text-sm text-jump-green mt-4 inline-block">
          ← Back to dashboard
        </Link>
      </Layout>
    )
  }

  const step = task.steps[currentStep]
  const isTaskComplete = task.status === 'completed'

  const completeStep = () => {
    const newCompleted = new Set(completedSteps)
    newCompleted.add(step.id)
    setCompletedSteps(newCompleted)

    if (currentStep < task.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (task.status === 'pending') {
        updateTaskStatus(task.id, 'in_progress')
      }
    } else {
      updateTaskStatus(task.id, 'completed')
      setShowCelebration(true)
    }
  }

  if (showCelebration || isTaskComplete) {
    return (
      <Layout role="client">
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-jump-green-light flex items-center justify-center mx-auto mb-6">
            <PartyPopper className="w-8 h-8 text-jump-green" />
          </div>
          <h1 className="text-2xl font-semibold text-jump-text mb-2">Task completed!</h1>
          <p className="text-jump-muted mb-2">{task.title}</p>

          <Card className="p-5 mt-6 mb-8 text-left">
            <div className="flex items-start gap-2 text-sm text-jump-green bg-jump-green-light rounded-lg px-4 py-3">
              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Expected outcome</p>
                <p className="mt-0.5">{task.expectedOutcome}</p>
              </div>
            </div>
            <p className="text-sm text-jump-muted mt-4">
              Your advisor has been notified. This contribution will appear in your
              Financial Progress dashboard.
            </p>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/client')}>Back to dashboard</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Demo home
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout role="client" fullWidth>
      <Link
        to="/client"
        className="inline-flex items-center gap-1.5 text-sm text-jump-muted hover:text-jump-text mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All tasks
      </Link>

      <div className="mb-5">
        <h1 className="text-xl font-semibold text-jump-text">{task.title}</h1>
        <p className="text-jump-muted text-sm mt-1">{task.description}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-jump-muted">
              <Calendar className="w-4 h-4" />
              Due: {task.dueDate}
            </span>
            {task.institution && (
              <span className="flex items-center gap-1.5 text-jump-muted">
                <Building2 className="w-4 h-4" />
                {task.institution}
              </span>
            )}
            <Badge variant="default">{task.category}</Badge>
          </div>

          <Card className="overflow-hidden">
            <div className="bg-jump-text px-6 py-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-jump-green" />
                <span className="text-sm font-medium text-white/70">
                  AI Guidance — Step {currentStep + 1} of {task.steps.length}
                </span>
              </div>
              <h2 className="font-semibold text-lg">{step.title}</h2>
            </div>

            <div className="p-6">
              <p className="text-jump-body leading-relaxed">{step.description}</p>

              {step.tip && (
                <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                      Pro tip
                    </p>
                    <p className="text-sm text-amber-700">{step.tip}</p>
                  </div>
                </div>
              )}

              {task.institution && currentStep === 1 && (
                <div className="mt-4 p-4 border border-dashed border-jump-border rounded-lg bg-jump-surface text-center">
                  <p className="text-sm text-jump-text font-medium mb-2">
                    V2: Deep integration
                  </p>
                  <p className="text-xs text-jump-muted mb-3">
                    Sign into {task.institution} here and we'll walk you through it
                    together via MCP integration.
                  </p>
                  <Button variant="secondary" size="sm" disabled>
                    Connect to {task.institution} (V2)
                  </Button>
                </div>
              )}

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-jump-border">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous step
                </Button>
                <Button
                  icon={<ChevronRight className="w-4 h-4" />}
                  onClick={completeStep}
                >
                  {currentStep === task.steps.length - 1 ? 'Mark complete' : 'Complete step'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <h3 className="font-semibold text-jump-text text-sm mb-4">Steps</h3>
            <div className="space-y-1">
              {task.steps.map((s, i) => {
                const done = completedSteps.has(s.id)
                const active = i === currentStep
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(i)}
                    className={clsx(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors',
                      active && 'bg-jump-nav-active text-jump-text',
                      !active && 'hover:bg-jump-surface text-jump-body'
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-jump-green flex-shrink-0" />
                    ) : active ? (
                      <div className="w-4 h-4 rounded-full border-2 border-jump-green flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-jump-border flex-shrink-0" />
                    )}
                    <span className={clsx(done && 'line-through text-jump-muted')}>
                      {s.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-jump-green" />
              <h3 className="font-semibold text-jump-text text-sm">Why this matters</h3>
            </div>
            <p className="text-sm text-jump-green bg-jump-green-light rounded-lg px-3 py-2.5">
              {task.expectedOutcome}
            </p>
          </Card>

          <Card className="p-4 bg-jump-surface border-dashed">
            <p className="text-xs text-jump-muted leading-relaxed">
              <span className="font-medium text-jump-body">Stuck?</span> Ask your AI
              assistant or message{' '}
              {task.institution
                ? `your advisor about this ${task.institution} task`
                : 'your advisor'}{' '}
              directly.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
