import { Link } from 'react-router-dom'
import { Users, UserCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Layout } from '../components/Layout'
import { Card } from '../components/Card'

const flows = [
  {
    role: 'advisor' as const,
    title: 'Advisor Flow',
    description:
      'Review a meeting recap, approve AI-suggested tasks, and invite your client to the dashboard.',
    steps: [
      'Meeting recap & transcript',
      'Review AI-suggested tasks',
      'Approve & customize tasks',
      'Invite client to dashboard',
    ],
    path: '/advisor',
    icon: Users,
  },
  {
    role: 'client' as const,
    title: 'Client Flow',
    description:
      'See assigned tasks with due dates and expected outcomes, then complete them with AI guidance.',
    steps: [
      'Activate account from invite',
      'View assigned action items',
      'Step-by-step AI guidance',
      'Mark tasks complete',
    ],
    path: '/client/welcome',
    icon: UserCircle,
  },
]

export function Landing() {
  return (
    <Layout role="landing">
      <div className="max-w-3xl mx-auto text-center py-6">
        <div className="inline-flex items-center gap-2 bg-jump-green-light text-jump-green text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          MVP Prototype — Mass Affluent Segment (V1)
        </div>

        <h1 className="text-4xl font-semibold text-jump-text tracking-tight mb-4">
          From Advice to Action
        </h1>
        <p className="text-lg text-jump-muted max-w-2xl mx-auto leading-relaxed">
          Jump Advise closes the gap between advisor recommendations and client
          execution. Choose a flow to explore the click-through demo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
        {flows.map((flow) => (
          <Card key={flow.role} className="overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 rounded-lg bg-jump-nav-active text-jump-blue flex items-center justify-center mb-4">
                <flow.icon className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-semibold text-jump-text mb-2">
                {flow.title}
              </h2>
              <p className="text-jump-muted text-sm leading-relaxed mb-5">
                {flow.description}
              </p>

              <ul className="space-y-2 mb-6">
                {flow.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-2.5 text-sm text-jump-body"
                  >
                    <span className="w-5 h-5 rounded-full bg-jump-surface text-jump-muted text-xs flex items-center justify-center font-medium flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>

              <Link
                to={flow.path}
                className="inline-flex items-center gap-2 font-medium text-sm px-5 py-2.5 rounded-lg transition-colors bg-jump-green text-white hover:bg-jump-green-hover"
              >
                Start {flow.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <Card className="p-6 bg-jump-surface border-dashed">
          <h3 className="text-sm font-semibold text-jump-text mb-3">
            MVP Scope (In Demo)
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Advisor invites clients to dashboard',
              'AI-suggested tasks from meeting notes',
              'Advisor task review & approval',
              'Client task list with outcomes & due dates',
              'Step-by-step AI-guided completion',
              'Financial progress metrics & net worth tracking',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-jump-body">
                <CheckCircle2 className="w-4 h-4 text-jump-green flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  )
}
