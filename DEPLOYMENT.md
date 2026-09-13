# EventEase deployment checklist

Production domain: `eventsease.online`

## Frontend
- Working directory: `frontend/Frontend`
- Install: `npm install`
- Build: `npm run build`
- Output: `dist`

## Backend
- Working directory: `backend`
- Install: `npm install`
- Start: `npm start`
- Node.js: 20.19+ recommended

Set all backend environment variables from `backend/.env.example` in Hostinger's environment-variable settings. Do not upload a real `.env` file to a public repository.

## Reverse proxy
The application expects:
- `https://eventsease.online/` → frontend
- `https://eventsease.online/api/*` → backend
- `https://eventsease.online/socket.io/*` → backend

## External providers
Google OAuth authorized origin:
- `https://eventsease.online`
- `https://www.eventsease.online`

Use the production domain in any provider callback/origin configuration.

## Health check
`GET https://eventsease.online/api/health-check`
