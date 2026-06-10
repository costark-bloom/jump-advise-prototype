import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mail,
  CheckCircle2,
  Send,
  PartyPopper,
  ArrowRight,
  UserPlus,
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { AutomationsPanel } from '../components/AutomationsPanel'
import { useApp } from '../context/AppContext'
import { client, advisor } from '../data/mockData'

export function AdvisorInvite() {
  const navigate = useNavigate()
  const { tasks, inviteClient, clientInvited, approvedTaskCount } = useApp()
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(clientInvited)

  const approvedTasks = tasks.filter((t) => t.approved)

  const handleSend = async () => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1500))
    inviteClient()
    setSending(false)
    setSent(true)
  }

  if (sent) {
    return (
      <Layout
        role="advisor"
        breadcrumbs={[
          { label: 'Actions', to: '/advisor/tasks' },
          { label: 'Invite sent' },
        ]}
        title="Invite sent"
        subtitle={`${client.name} can now access their Advise dashboard`}
        rightPanel={
          <AutomationsPanel
            automations={[
              {
                id: '1',
                title: 'Send client dashboard invite',
                status: 'complete',
                icon: 'check',
                contactInitials: 'MP',
              },
            ]}
          />
        }
      >
        <div className="max-w-lg py-6">
          <div className="w-14 h-14 rounded-full bg-jump-green-light flex items-center justify-center mb-6">
            <PartyPopper className="w-7 h-7 text-jump-green" />
          </div>

          <Card className="p-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-jump-body" />
              <span className="text-sm font-medium text-jump-text">Email preview</span>
            </div>
            <div className="bg-jump-surface rounded-lg p-4 text-sm text-jump-body leading-relaxed">
              <p className="font-medium text-jump-text mb-2">Hi Michael & Jennifer,</p>
              <p>
                {advisor.name} has assigned you {approvedTaskCount} action items
                from your recent meeting. Your personalized dashboard is ready —
                complete them step-by-step with AI guidance.
              </p>
              <div className="mt-4">
                <span className="inline-block bg-jump-green text-white text-sm font-medium px-4 py-2 rounded-lg">
                  View My Action Items →
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/client/welcome')}
            >
              See client experience
            </Button>
            <Button variant="secondary" onClick={() => navigate('/advisor')}>
              Back to meeting
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      role="advisor"
      breadcrumbs={[
        { label: 'Actions', to: '/advisor/tasks' },
        { label: 'Invite client' },
      ]}
      title="Invite Client to Dashboard"
      subtitle="Send approved tasks to your client's Advise dashboard"
      avatars={[{ initials: 'MP', color: 'green' }]}
      rightPanel={
        <AutomationsPanel
          automations={[
            {
              id: '1',
              title: 'Suggest client action items',
              status: 'complete',
              icon: 'check',
              contactInitials: 'MP',
            },
            {
              id: '2',
              title: 'Send client dashboard invite',
              status: 'pending',
              icon: 'mail',
            },
          ]}
        />
      }
    >
      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <UserPlus className="w-5 h-5 text-jump-body" />
            <h2 className="font-semibold text-jump-text">Client Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-jump-muted">Client household</label>
              <input
                type="text"
                defaultValue={client.name}
                className="w-full mt-1 px-3 py-2.5 border border-jump-border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-jump-muted">Email address</label>
              <input
                type="email"
                defaultValue={client.email}
                className="w-full mt-1 px-3 py-2.5 border border-jump-border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-jump-muted">
                Personal message (optional)
              </label>
              <textarea
                rows={3}
                defaultValue="Great meeting today! I've set up your action items in Jump — each one includes step-by-step guidance. Let me know if you have questions."
                className="w-full mt-1 px-3 py-2.5 border border-jump-border rounded-lg text-sm resize-none"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="font-semibold text-jump-text mb-4">
              Tasks to assign ({approvedTasks.length})
            </h2>
            <div className="space-y-3">
              {approvedTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-jump-green mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-jump-text">{task.title}</p>
                    <p className="text-xs text-jump-muted mt-0.5">Due {task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 bg-jump-green-light border-jump-green/20">
            <p className="text-sm text-jump-text">
              <span className="font-medium">What happens next:</span> Client
              receives an email invite, creates their account, and sees these
              tasks with AI-guided step-by-step completion workflows.
            </p>
          </Card>

          <Button
            className="w-full"
            size="lg"
            loading={sending}
            icon={<Send className="w-4 h-4" />}
            onClick={handleSend}
          >
            Send dashboard invite
          </Button>
        </div>
      </div>
    </Layout>
  )
}
