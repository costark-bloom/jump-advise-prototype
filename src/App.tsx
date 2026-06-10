import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Landing } from './pages/Landing'
import { AdvisorMeeting } from './pages/AdvisorMeeting'
import { AdvisorTasks } from './pages/AdvisorTasks'
import { AdvisorInvite } from './pages/AdvisorInvite'
import { ClientWelcome } from './pages/ClientWelcome'
import { ClientDashboard } from './pages/ClientDashboard'
import { ClientTask } from './pages/ClientTask'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Advisor flow */}
          <Route path="/advisor" element={<AdvisorMeeting />} />
          <Route path="/advisor/tasks" element={<AdvisorTasks />} />
          <Route path="/advisor/invite" element={<AdvisorInvite />} />

          {/* Client flow */}
          <Route path="/client/welcome" element={<ClientWelcome />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/task/:taskId" element={<ClientTask />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
