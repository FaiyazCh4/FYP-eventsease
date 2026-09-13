# EventEase

EventEase is a MERN-based multi-vendor event management platform for customers, vendors, and administrators.

## Production domain

- Website: https://eventsease.online
- API: https://eventsease.online/api
- Socket.IO: https://eventsease.online/socket.io

The frontend is configured to use `https://eventsease.online/api` in production.

## Project structure

- `frontend/Frontend` — React + Vite frontend
- `backend` — Express + MongoDB API and Socket.IO server

## Requirements

- Node.js 20.19+ (recommended)
- npm
- MongoDB Atlas
- Cloudinary
- Google OAuth
- Stripe
- Gmail SMTP (or another SMTP provider)

## Backend environment

Create `backend/.env` from `backend/.env.example` and set the real values in your hosting provider. Do **not** commit `.env`.

Required variables include:

- `PORT`
- `JWT_SECRET`
- `MONGO_URI`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`

## Frontend environment

Production values are provided in `.env.production`:

- `VITE_API_URL=https://eventsease.online/api`
- `VITE_GOOGLE_CLIENT_ID=...`
- `VITE_STRIPE_PUBLISHABLE_KEY=...`

Only public Google/Stripe browser keys belong in the frontend. Never place MongoDB, JWT, Cloudinary secret, SMTP password, or Stripe secret keys in frontend files.

## Build

```bash
cd frontend/Frontend
npm install
npm run build
```

The production build is generated in `frontend/Frontend/dist`.

## Backend

```bash
cd backend
npm install
npm start
```

The API exposes `/api/health-check` for a basic health check.

## Important production configuration

1. Point `eventsease.online` to the frontend hosting service.
2. Run the Node.js backend with the environment variables from `backend/.env.example`.
3. If frontend and backend are served by the same domain, configure the host/reverse proxy so:
   - `/` serves the frontend
   - `/api/*` reaches the Node backend
   - `/socket.io/*` reaches the Node backend
4. Add `https://eventsease.online` and `https://www.eventsease.online` to the Google OAuth authorized JavaScript origins.
5. Configure the appropriate Stripe test/live keys and webhook/domain settings before accepting real payments.

## Security note

The original archive contained live-looking credentials in `backend/.env`. That file has intentionally been removed from this deployment package. Rotate the MongoDB password, Google OAuth secret, Cloudinary API secret, Stripe secret key, SMTP app password, and JWT secret before production because the original credentials were exposed in the uploaded archive/chat.
