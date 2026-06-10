import { createContext, useContext, useState, type ReactNode } from 'react'
import { suggestedTasks as initialTasks, client as initialClient } from '../data/mockData'
import type { Task } from '../types'

interface AppState {
  tasks: Task[]
  clientInvited: boolean
  clientActivated: boolean
  approveTask: (id: string) => void
  toggleTaskApproval: (id: string) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  inviteClient: () => void
  activateClient: () => void
  approvedTaskCount: number
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [clientInvited, setClientInvited] = useState(initialClient.invited)
  const [clientActivated, setClientActivated] = useState(initialClient.activated)

  const approveTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
    )
  }

  const toggleTaskApproval = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, approved: !t.approved } : t))
    )
  }

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    )
  }

  const inviteClient = () => setClientInvited(true)
  const activateClient = () => setClientActivated(true)

  const approvedTaskCount = tasks.filter((t) => t.approved).length

  return (
    <AppContext.Provider
      value={{
        tasks,
        clientInvited,
        clientActivated,
        approveTask,
        toggleTaskApproval,
        updateTaskStatus,
        inviteClient,
        activateClient,
        approvedTaskCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
