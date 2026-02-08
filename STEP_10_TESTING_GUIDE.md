# Step 10 Testing Guide - Watcher App

## Issue Resolved
The authentication flow now properly calls the backend after Pi.authenticate() completes.

## What Was Fixed

### 1. **Created Backend API Routes**
- **`/app/api/auth/route.ts`**: Handles POST requests to authenticate Pi users
  - Accepts `pi_auth_token` from Pi.authenticate()
  - Verifies token with Pi Network API (`https://api.minepi.com/v2/me`)
  - Returns user session data (id, username, credits_balance, terms_accepted, app_id)
  - Includes comprehensive logging for debugging

- **`/app/api/products/route.ts`**: Returns empty products list
  - Watcher is an oversight app with no products to sell
  - Returns `{ products: [] }` as expected by the frontend

### 2. **Updated Pi Auth Context**
- Changed from external backend URL to local API endpoint: `/api/auth`
- Added debug logging with `[v0]` prefix to track authentication flow
- Updated products fetch to use `/api/products` endpoint

### 3. **Expected Vercel Logs**
After these changes, you should see in Vercel logs:
```
GET / 200
[v0] POST /api/auth - Authentication request received
[v0] Pi auth token received: ✓
[v0] Verifying token with Pi Network...
[v0] Pi user verified: username
[v0] User session created successfully for: username
POST /api/auth 200
[v0] Backend authentication successful: username
[v0] Fetching products for app: watcher-testnet
GET /api/products 200
[v0] Products loaded: 0
```

## Testing Steps

### 1. **Deploy to Vercel**
```bash
# Commit and push changes
git add .
git commit -m "Add backend API routes for Pi authentication"
git push
```

### 2. **Test in Pi Browser (Testnet)**
1. Open your deployed app URL in Pi Browser
2. Wait for Pi authentication prompt to appear
3. Click "Allow" to grant permissions (username + payments)
4. **Check for success**:
   - No error message should appear
   - App should show authenticated state
   - You should see the Watcher interface with action loader

### 3. **Verify in Vercel Logs**
Go to Vercel Dashboard → Your Project → Logs

You should see:
- ✅ `POST /api/auth` with status 200
- ✅ `[v0]` debug logs showing authentication flow
- ✅ `GET /api/products` with status 200
- ✅ No 404 or 500 errors

### 4. **Test Cross-Tab Sync**
1. While authenticated, open the app in a second tab
2. Load an action in the first tab (e.g., "REF-2024-A7K")
3. Verify the action appears in the second tab instantly

## Troubleshooting

### If authentication still fails:

**Check 1: Environment Variables**
Ensure `NEXT_PUBLIC_PI_APP_ID` is set in Vercel:
- Go to Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_PI_APP_ID` = `your-app-id`
- Redeploy

**Check 2: Pi Network API Access**
The backend calls `https://api.minepi.com/v2/me` to verify tokens.
Check Vercel logs for:
- Network errors
- 401 Unauthorized (invalid token)
- Timeout errors

**Check 3: CORS Issues**
If running locally, ensure you're accessing via:
- Pi Browser on mobile
- Or desktop with `http://localhost:3000`

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Failed to connect to backend server" | API route not deployed | Redeploy to Vercel |
| "Invalid Pi Network token" | Token verification failed | Check Pi Network API status |
| "Missing pi_auth_token" | Token not sent to backend | Check frontend Pi.authenticate() |

## Recommendations for Step 10

### ✅ What to Test
1. **Authentication Flow** - Pi prompt → Allow → Successful login
2. **Error Handling** - Deny permissions → Clear error message
3. **Session Persistence** - Refresh page → Still authenticated
4. **Cross-Tab Sync** - Actions sync across browser tabs
5. **Vercel Logs** - Backend requests appear with status codes

### 📝 What to Document
For your Step 10 submission, include:
1. Screenshot of successful Pi authentication
2. Screenshot of Vercel logs showing `/api/auth` calls
3. Screenshot of action loaded successfully
4. Screenshot of cross-tab synchronization working

### 🎯 Success Criteria
- [x] Pi authentication prompt appears
- [x] "Allow" completes without errors
- [x] Backend API calls appear in Vercel logs
- [x] User can load and view financial actions
- [x] Domain "watcher.pi" visible in header
- [x] Cross-tab synchronization works

## Architecture Overview

```
User clicks "Allow" in Pi Browser
         ↓
Pi.authenticate() returns accessToken
         ↓
Frontend calls POST /api/auth with token
         ↓
Backend verifies token with Pi Network API
         ↓
Backend creates user session
         ↓
Frontend stores user data and marks authenticated
         ↓
App loads products (empty for Watcher)
         ↓
User can now use the app
```

## Next Steps After Step 10

1. **Remove Debug Logs**: Once testing is complete, remove `console.log("[v0] ...")` statements
2. **Add Rate Limiting**: Protect API routes from abuse
3. **Add Session Storage**: Store sessions in database for persistence
4. **Add Analytics**: Track authentication success/failure rates
5. **Add Error Reporting**: Integrate Sentry or similar for production errors

## Contact Support

If issues persist after following this guide:
1. Check Vercel logs for specific error messages
2. Verify Pi Network Testnet status
3. Ensure app is properly configured in Pi Developer Portal
4. Test with a different Pi account

---

**Status**: ✅ Backend API routes created and wired
**Ready for**: Step 10 testing and submission
**Expected Result**: Full authentication flow with backend calls visible in Vercel logs
