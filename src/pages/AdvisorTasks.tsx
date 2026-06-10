import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Circle,
  Pencil,
  Sparkles,
  Send,
  AlertCircle,
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { TaskCard } from '../components/TaskCard'
import { AutomationsPanel } from '../components/AutomationsPanel'
import { useApp } from '../context/AppContext'
import { client } from '../data/mockData'

export function AdvisorTasks() {
  const navigate = useNavigate()
  const { tasks, toggleTaskApproval, approvedTaskCount } = useApp()
  const [editingId, setEditingId] = useState<string | null>(null)
  const allApproved = approvedTaskCount === tasks.length

  const approveAll = () => {
    tasks.forEach((t) => {
      if (!t.approved) toggleTaskApproval(t.id)
    })
  }

  return (
    <Layout
      role="advisor"
      breadcrumbs={[
        { label: 'Actions', to: '/advisor/tasks' },
        { label: 'Review suggested tasks' },
      ]}
      title="Review Suggested Tasks"
      subtitle={`Approve action items before assigning to ${client.name}`}
      avatars={[{ initials: 'MP', color: 'green' }]}
      rightPanel={
        <AutomationsPanel
          automations={[
            {
              id: '1',
              title: 'Suggest client action items',
              status: 'complete',
              icon: 'sparkles',
              contactInitials: 'MP',
            },
            {
              id: '2',
              title: 'Send client dashboard invite',
              status: 'pending',
              icon: 'mail',
            },
          ]}
          actionLabel={approvedTaskCount > 0 ? 'Continue to invite client' : undefined}
          onAction={() => approvedTaskCount > 0 && navigate('/advisor/invite')}
        />
      }
    >
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Badge variant="ai">
              <Sparkles className="w-3 h-3 mr-1" />
              {tasks.length} AI-suggested
            </Badge>
            <span className="text-sm text-jump-muted">
              {approvedTaskCount} of {tasks.length} approved
            </span>
          </div>
          <div className="flex gap-2">
            {!allApproved && (
              <Button variant="secondary" size="sm" onClick={approveAll}>
                Approve all
              </Button>
            )}
            <Button
              size="sm"
              icon={<Send className="w-4 h-4" />}
              disabled={approvedTaskCount === 0}
              onClick={() => navigate('/advisor/invite')}
            >
              Continue to invite
            </Button>
          </div>
        </div>

        {!allApproved && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Review before sending</p>
              <p className="text-amber-700 mt-0.5">
                Advisors who approve without editing signal AI trustworthiness.
                Edit any task that doesn't match your recommendation.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id}>
              <div className="flex gap-4 items-start">
                <button
                  onClick={() => toggleTaskApproval(task.id)}
                  className="mt-6 flex-shrink-0 transition-colors"
                  aria-label={task.approved ? 'Unapprove task' : 'Approve task'}
                >
                  {task.approved ? (
                    <CheckCircle2 className="w-6 h-6 text-jump-green" />
                  ) : (
                    <Circle className="w-6 h-6 text-jump-border hover:text-jump-green" />
                  )}
                </button>

                <div className="flex-1">
                  <TaskCard task={task} showApproval />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-5 flex-shrink-0"
                  icon={<Pencil className="w-4 h-4" />}
                  onClick={() =>
                    setEditingId(editingId === task.id ? null : task.id)
                  }
                >
                  Edit
                </Button>
              </div>

              {editingId === task.id && (
                <Card className="ml-10 mt-3 p-4 border-jump-nav-active bg-jump-surface/50">
                  <p className="text-sm text-jump-body mb-3">
                    <span className="font-medium text-jump-text">Edit task details</span> — In
                    production, advisors can modify title, due date, expected
                    outcome, and step-by-step guidance.
                  </p>
                  <div className="grid gap-3 text-sm">
                    <div>
                      <label className="text-xs text-jump-muted font-medium">Title</label>
                      <input
                        type="text"
                        defaultValue={task.title}
                        className="w-full mt-1 px-3 py-2 border border-jump-border rounded-lg bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-jump-muted font-medium">
                        Expected Outcome
                      </label>
                      <input
                        type="text"
                        defaultValue={task.expectedOutcome}
                        className="w-full mt-1 px-3 py-2 border border-jump-border rounded-lg bg-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-jump-muted font-medium">Due Date</label>
                        <input
                          type="text"
                          defaultValue={task.dueDate}
                          className="w-full mt-1 px-3 py-2 border border-jump-border rounded-lg bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-jump-muted font-medium">Priority</label>
                        <select
                          defaultValue={task.priority}
                          className="w-full mt-1 px-3 py-2 border border-jump-border rounded-lg bg-white text-sm"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button size="sm" onClick={() => setEditingId(null)}>
                      Save changes
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            icon={<Send className="w-4 h-4" />}
            disabled={approvedTaskCount === 0}
            onClick={() => navigate('/advisor/invite')}
          >
            Continue to invite client ({approvedTaskCount} tasks)
          </Button>
        </div>
      </div>
    </Layout>
  )
}
