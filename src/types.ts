export type TaskStatus = 'pending' | 'in_progress' | 'completed'
export type TaskPriority = 'high' | 'medium' | 'low'

export interface TaskStep {
  id: string
  title: string
  description: string
  tip?: string
}

export interface Task {
  id: string
  title: string
  description: string
  category: string
  dueDate: string
  expectedOutcome: string
  institution?: string
  status: TaskStatus
  priority: TaskPriority
  steps: TaskStep[]
  aiSuggested: boolean
  approved: boolean
}

export interface Client {
  id: string
  name: string
  email: string
  netWorth: string
  invited: boolean
  activated: boolean
}

export interface MeetingNote {
  id: string
  clientName: string
  date: string
  duration: string
  summary: string
  keyTopics: string[]
  transcript: string
}
