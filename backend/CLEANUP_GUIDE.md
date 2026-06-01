# Vercel Deployment Checklist

## Files and Directories to DELETE

The following are no longer needed after converting to Vercel serverless functions:

### Delete These Directories:
- [ ] `src/` - Contains old Express.js server code
- [ ] `uploads/` - File uploads not supported in serverless (use Vercel Blob Storage instead)

### Delete These Files (if in root):
- [ ] `src/index.js` - Old server entry point
- [ ] `src/config/db.js` - MongoDB connection (no longer used)

### Why They're Not Needed:

1. **src/ directory** - All functionality has been moved to `/api` which uses serverless functions
2. **uploads/ directory** - Vercel serverless doesn't have persistent file storage; use Vercel Blob Storage instead
3. **MongoDB files** - No database connection needed for in-memory data store

### Migration Path:

- ✅ **Already Done:**
  - Created `/api/` directory with serverless functions
  - Created `vercel.json` configuration
  - Updated `package.json` to remove Express, MongoDB, etc.
  - Updated `.env` file

- **Next Steps:**
  1. Delete the files/folders listed above
  2. Run `npm install` to update dependencies
  3. Test locally: `npm start`
  4. Deploy: `vercel` or push to GitHub (if connected to Vercel)

### Keep These:

- ✅ `package.json` - Updated for Vercel
- ✅ `.env` - Updated with only JWT_SECRET
- ✅ `.env.example` - Example environment variables
- ✅ `vercel.json` - Vercel configuration
- ✅ `api/` - New serverless functions
- ✅ `README.md` - Original documentation (can update)
- ✅ `VERCEL_DEPLOYMENT.md` - Deployment guide

---

**After deletion, your backend directory structure will be:**

```
backend/
├── package.json
├── vercel.json
├── .env
├── .env.example
├── README.md
├── VERCEL_DEPLOYMENT.md
├── api/
│   ├── health.js
│   ├── auth.js
│   ├── items.js
│   ├── borrow.js
│   ├── notifications.js
│   ├── payments.js
│   ├── ai.js
│   └── lib/
│       ├── auth.js
│       └── dataStore.js
```

This is a clean, serverless-ready backend! 🚀
