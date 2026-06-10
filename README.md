# Jump Advise — MVP Prototype

Click-through demo for the Jump Staff PM take-home presentation.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Live Demo

**https://cole881.github.io/jump-advise-prototype/**

Share this link for click-through access — no install required.

## Demo Flow

### Advisor Flow (recommended order)
1. **Meeting Recap** — View Meet-generated summary, client profile, and AI-suggested tasks
2. **Review Tasks** — Approve/edit tasks before sending to client
3. **Invite Client** — Send dashboard invite email
4. **Client Experience** — Click through to see what the client receives

### Client Flow (standalone)
1. **Welcome** — Activate account from advisor invite
2. **Dashboard** — View assigned tasks with due dates and expected outcomes
3. **Task Detail** — Step-by-step AI-guided completion workflow

Use the header toggle to switch between Advisor and Client views at any time.

## MVP Scope (In Demo)

- Advisor invites clients to dashboard
- AI-suggested tasks from meeting notes + profile data
- Advisor task review & approval workflow
- Client task list with due dates and expected outcomes
- Step-by-step AI-guided task completion

## Out of Scope (Noted in UI)

- Client self-service profile uploads
- MCP server integrations (shown as V2 placeholder)
- Full financial progress metrics (preview only)

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Mock data only — no backend required
