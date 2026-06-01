# TrustLoop Backend

This backend is built with Node.js, Express, and MongoDB.
It exposes REST APIs for authentication, item listings, borrowing, notifications, payments, and AI image analysis.

## Setup

1. Copy `.env.example` to `.env`
2. Set `MONGODB_URI` to your MongoDB Atlas connection string
3. Install packages:

```bash
cd backend
npm install
```

4. Run the server locally:

```bash
npm run dev
```

## Available API routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/verify`
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `POST /api/borrow/:itemId`
- `GET /api/borrow/requests`
- `GET /api/notifications`
- `PATCH /api/notifications/:id`
- `POST /api/notifications/reminder`
- `POST /api/notifications`
- `POST /api/payments/create`
- `POST /api/payments/verify`
- `POST /api/payments/refund`
- `POST /api/ai/report`
- `POST /api/ai/compare`
- `POST /api/ai/damage`

## Notes

- File uploads are stored in `uploads/`.
- The backend is ready for MongoDB Atlas via `MONGODB_URI`.
- Set `OPENAI_API_KEY` in your environment to enable real AI-powered condition reports.
- The API is intentionally simple and easy to extend for production.
