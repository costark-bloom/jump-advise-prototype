import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ListChecks,
  MessageSquare,
  User,
  MoreVertical,
  Circle,
} from 'lucide-react'
import { Layout } from '../components/Layout'
import { Button } from '../components/Button'
import { Badge } from '../components/Badge'
import { AutomationsPanel } from '../components/AutomationsPanel'
import { meeting } from '../data/mockData'
import { useApp } from '../context/AppContext'

export function AdvisorMeeting() {
  const navigate = useNavigate()
  const { tasks } = useApp()
  const [showTranscript, setShowTranscript] = useState(false)
  const [activeTab, setActiveTab] = useState('notes')

  const tabs = [
    { id: 'notes', label: 'Meeting notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'actions', label: 'Action items', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'ask', label: 'Ask anything', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'profile', label: 'Client profile', icon: <User className="w-4 h-4" /> },
  ]

  return (
    <Layout
      role="advisor"
      breadcrumbs={[
        { label: 'Meetings', to: '/advisor' },
        { label: 'Past' },
        { label: meeting.clientName },
      ]}
      title={meeting.clientName}
      subtitle={`${meeting.date} · ${meeting.duration}`}
      avatars={[
        { initials: 'SC', color: 'blue' },
        { initials: 'MP', color: 'green' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Circle className="w-2 h-2 fill-red-500 text-red-500" />}>
            Capture meeting now
          </Button>
          <button className="p-2 hover:bg-jump-surface rounded-lg">
            <MoreVertical className="w-4 h-4 text-jump-muted" />
          </button>
        </div>
      }
      rightPanel={
        <AutomationsPanel
          automations={[
            {
              id: '1',
              title: 'Generate meeting summary',
              status: 'complete',
              icon: 'check',
              contactInitials: 'MP',
            },
            {
              id: '2',
              title: 'Suggest client action items',
              status: 'complete',
              icon: 'sparkles',
              contactInitials: 'MP',
            },
            {
              id: '3',
              title: 'Create follow-up email draft',
              status: 'pending',
              icon: 'mail',
            },
          ]}
          actionLabel="Review & approve action items"
          onAction={() => navigate('/advisor/tasks')}
        />
      }
    >
      {activeTab === 'notes' && (
        <div className="max-w-3xl space-y-8">
          <div className="flex justify-end gap-2 -mt-2 mb-2">
            <button className="text-sm text-jump-muted hover:text-jump-body px-3 py-1.5 rounded-lg hover:bg-jump-surface">
              Export
            </button>
            <button className="text-sm text-jump-muted hover:text-jump-body px-3 py-1.5 rounded-lg hover:bg-jump-surface">
              Copy
            </button>
          </div>

          <section>
            <h2 className="text-base font-semibold text-jump-text mb-3">
              Meeting Summary
            </h2>
            <p className="text-jump-body text-sm leading-relaxed">
              {meeting.summary}
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-jump-text mb-3">
              Key Topics Discussed
            </h2>
            <ul className="space-y-2">
              {meeting.keyTopics.map((topic) => (
                <li key={topic} className="text-sm text-jump-body flex items-start gap-2">
                  <span className="text-jump-muted mt-1">•</span>
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-1.5 text-sm text-jump-body hover:text-jump-text font-medium"
            >
              {showTranscript ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {showTranscript ? 'Hide' : 'View'} full transcript
            </button>
            {showTranscript && (
              <div className="mt-3 p-4 bg-jump-surface rounded-lg text-sm text-jump-body leading-relaxed whitespace-pre-line">
                {meeting.transcript}
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-jump-text">
                Suggested Action Items
              </h2>
              <p className="text-sm text-jump-muted mt-1">
                {tasks.length} items generated from meeting notes and client profile
              </p>
            </div>
            <Badge variant="ai">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Generated
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            {tasks.map((task, i) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-4 border border-jump-border rounded-lg hover:bg-jump-surface/50 transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-jump-nav-active text-jump-blue text-xs flex items-center justify-center font-semibold flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-jump-text">{task.title}</p>
                  <p className="text-xs text-jump-muted mt-1">
                    Due {task.dueDate} · {task.expectedOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/advisor/tasks')}
          >
            Review & Approve Tasks
          </Button>
        </div>
      )}

      {activeTab === 'ask' && (
        <div className="max-w-3xl">
          <div className="border border-jump-border rounded-lg p-6 bg-jump-surface/30">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-jump-muted" />
              <span className="text-sm font-medium text-jump-text">Ask anything about this meeting</span>
            </div>
            <div className="bg-white border border-jump-border rounded-lg px-4 py-3 text-sm text-jump-muted">
              e.g. "What tax implications did we discuss for the Roth conversion?"
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-3xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: 'Household', value: meeting.clientName },
              { label: 'Net Worth', value: '$840,000' },
              { label: 'Tax Bracket', value: '24% Federal' },
              { label: 'Traditional IRA', value: 'Robinhood · $285K' },
              { label: '401(k)', value: 'Fidelity · $312K' },
              { label: 'Last Meeting', value: '3 months ago' },
            ].map((field) => (
              <div key={field.label}>
                <span className="text-jump-muted text-xs">{field.label}</span>
                <p className="font-medium text-jump-text text-sm mt-0.5">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
