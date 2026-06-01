# TrustLoop Backend - Vercel Deployment

This backend has been converted to Vercel serverless functions. It no longer uses Express or MongoDB.

## Deployment to Vercel

### Prerequisites
- Vercel account (vercel.com)
- Git repository

### Steps to Deploy

1. **Install Vercel CLI** (optional, for local testing):
   ```bash
   npm install -g vercel
   ```

2. **Test Locally** (optional):
   ```bash
   npm install
   npm start
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Follow the prompts to deploy.

4. **Add Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `JWT_SECRET=your_secret_key_here`

### API Endpoints

All endpoints are now available at `https://your-project.vercel.app/api/`

- **Auth**
  - `POST /api/auth?action=signup` - Sign up
  - `POST /api/auth?action=login` - Login
  - `POST /api/auth?action=verify` - Verify token

- **Items**
  - `GET /api/items` - Get all items
  - `GET /api/items?id=<itemId>` - Get single item
  - `POST /api/items` - Create item

- **Borrow**
  - `GET /api/borrow?requests=true` - Get borrow requests
  - `POST /api/borrow` - Create borrow request
  - `PATCH /api/borrow` - Update borrow request

- **Notifications**
  - `GET /api/notifications` - Get notifications
  - `POST /api/notifications` - Create notification
  - `PATCH /api/notifications?id=<notificationId>` - Update notification

- **Payments**
  - `GET /api/payments` - Get payments
  - `POST /api/payments` - Create payment

- **AI**
  - `POST /api/ai?action=report` - Generate condition report
  - `POST /api/ai?action=compare` - Compare before/after
  - `POST /api/ai?action=damage` - Detect damages

- **Health**
  - `GET /api/health` - Health check

## Data Storage

**Note:** This serverless implementation uses in-memory data storage. This means:
- Data is **NOT persisted** between function invocations
- Ideal for **prototyping and demos**
- For **production**, consider using:
  - Vercel PostgreSQL
  - Firebase Realtime Database
  - MongoDB Atlas (if you want to use MongoDB)
  - Vercel KV Store

## Files to Delete (No longer needed)

These files are for local Express development and are not used in serverless deployment:

```
backend/src/
  ├── index.js
  ├── config/
  │   └── db.js
  ├── middleware/
  │   ├── auth.js
  │   ├── errorHandler.js
  │   └── upload.js
  ├── models/
  │   ├── BorrowRequest.js
  │   ├── Item.js
  │   ├── Notification.js
  │   ├── Payment.js
  │   └── User.js
  ├── controllers/
  │   ├── aiController.js
  │   ├── authController.js
  │   ├── borrowController.js
  │   ├── itemController.js
  │   ├── notificationController.js
  │   └── paymentController.js
  ├── routes/
  │   ├── ai.js
  │   ├── auth.js
  │   ├── borrow.js
  │   ├── items.js
  │   ├── notifications.js
  │   └── payments.js
uploads/ (directory)
```

These files are replaced by the `/api` directory structure.

## Environment Variables

Create a `.env` file with:
```
JWT_SECRET=your_secret_key_here
NODE_ENV=production
```

For production Vercel deployment, set these in Vercel dashboard instead of .env file.

## Next Steps for Production

1. **Replace in-memory storage** with a real database
2. **Add file upload handling** (use Vercel Blob Storage)
3. **Add authentication middleware** to protected routes
4. **Add request validation** and error handling
5. **Add rate limiting** for API endpoints
6. **Add logging and monitoring** with Vercel Analytics

## Local Development

```bash
# Install dependencies
npm install

# Test locally with Vercel CLI
npm start

# This will start a local Vercel environment on http://localhost:3000
```

## Support

For more information:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/runtimes/node-js)
