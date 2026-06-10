import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Avatar } from '../components/Avatar'
import { useApp } from '../context/AppContext'
import { client, advisor } from '../data/mockData'

export function ClientWelcome() {
  const navigate = useNavigate()
  const { activateClient, clientActivated, tasks } = useApp()
  const [activating, setActivating] = useState(false)

  const approvedTasks = tasks.filter((t) => t.approved)
  const taskCount = approvedTasks.length || tasks.length

  const handleActivate = async () => {
    setActivating(true)
    await new Promise((r) => setTimeout(r, 1200))
    activateClient()
    setActivating(false)
    navigate('/client')
  }

  if (clientActivated) {
    navigate('/client')
    return null
  }

  return (
    <Layout role="client">
      <div className="max-w-lg mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <div className="w-8 h-8 rounded-full bg-jump-text" />
          </div>
          <h1 className="text-2xl font-semibold text-jump-text mb-2">
            Welcome to Jump Advise
          </h1>
          <p className="text-jump-muted text-sm leading-relaxed">
            {advisor.name} has set up your personalized action plan. Complete
            recommended tasks step-by-step with AI guidance.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-jump-border">
            <Avatar initials="SC" color="blue" size="md" />
            <div>
              <p className="font-medium text-jump-text text-sm">{advisor.name}</p>
              <p className="text-xs text-jump-muted">{advisor.firm}</p>
            </div>
          </div>

          <p className="text-sm text-jump-body mb-4">
            Hi {client.name.split(' ')[0]} — great meeting today! I've assigned
            you <strong className="text-jump-text">{taskCount} action items</strong>. Each includes a due
            date, expected financial outcome, and step-by-step guidance.
          </p>

          <div className="space-y-2">
            {(approvedTasks.length ? approvedTasks : tasks)
              .slice(0, 3)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 text-sm text-jump-body"
                >
                  <CheckCircle2 className="w-4 h-4 text-jump-green flex-shrink-0" />
                  {task.title}
                </div>
              ))}
            {taskCount > 3 && (
              <p className="text-xs text-jump-muted pl-6">+{taskCount - 3} more tasks</p>
            )}
          </div>
        </Card>

        <Card className="p-4 mb-6 flex items-start gap-3 bg-jump-surface">
          <Shield className="w-5 h-5 text-jump-muted flex-shrink-0 mt-0.5" />
          <p className="text-xs text-jump-muted leading-relaxed">
            Your advisor already has your financial profile in Jump. You have
            full transparency into what data is held and can update it anytime.
          </p>
        </Card>

        <Button
          className="w-full"
          size="lg"
          loading={activating}
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={handleActivate}
        >
          Activate my dashboard
        </Button>

        <p className="text-center text-xs text-jump-muted mt-4">
          Invited as {client.email}
        </p>
      </div>
    </Layout>
  )
}
