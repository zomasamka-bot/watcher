# URL Configuration - Watcher App

## Production URLs

The Watcher app is configured to work with the following URLs:

### Primary Production URL (Vercel)
```
https://watcher-vb-vyqg2-kx-sa-vh.vercel.app
```
- Main production deployment on Vercel
- Full Pi Network integration
- Used for official app distribution

### PiNet Fallback URL
```
https://watcher4942.pinet.com
```
- Pi Network development/testing domain
- Provided by Pi for fallback access
- Used during development and testing phases

### Canonical Domain
```
https://watcher.pi
```
- Official Pi Network domain (when available)
- Used for app identity and branding
- Configured in pi.config.json

## Environment Detection

The app automatically detects which environment it's running in:

### Detection Logic
```typescript
// lib/env-config.ts
getCurrentEnvironment(): Environment
```

Detects:
- **development** - localhost or 127.0.0.1
- **production** - watcher-vb-vyqg2-kx-sa-vh.vercel.app
- **pinet** - watcher4942.pinet.com
- **watcher.pi** - watcher.pi domain
- **server** - server-side rendering

### Usage Example
```typescript
import { ENV_CONFIG } from '@/lib/env-config';

// Get current environment
const env = ENV_CONFIG.getCurrentEnvironment();

// Get API base URL (automatically adapts to environment)
const apiUrl = ENV_CONFIG.getApiBaseUrl();

// Check if in production
if (ENV_CONFIG.isProduction()) {
  // Production-specific logic
}
```

## Configuration Files

### 1. `/pi.config.json`
Contains Pi Network app configuration with URLs:
```json
{
  "website": "https://watcher.pi",
  "productionUrl": "https://watcher-vb-vyqg2-kx-sa-vh.vercel.app",
  "pinetUrl": "https://watcher4942.pinet.com"
}
```

### 2. `/lib/domain-config.ts`
Domain identity and verification:
```typescript
export const DOMAIN_CONFIG = {
  urls: {
    production: "https://watcher-vb-vyqg2-kx-sa-vh.vercel.app",
    pinet: "https://watcher4942.pinet.com",
    base: "https://watcher.pi"
  }
}
```

### 3. `/lib/env-config.ts`
Environment detection and API routing:
- Automatic environment detection
- Dynamic API base URL
- Environment-specific configuration

## API Routes

All API routes are relative and work across all environments:

```typescript
// Authentication
POST /api/auth

// Products
GET /api/products
```

The app uses relative URLs for API calls, ensuring they work correctly regardless of the deployment environment.

## Testing Across Environments

### Local Development
```bash
npm run dev
# Access at http://localhost:3000
```

### Vercel Production
```
https://watcher-vb-vyqg2-kx-sa-vh.vercel.app
```

### PiNet Testing
```
https://watcher4942.pinet.com
```

## CORS and Security

The app is configured to accept requests from:
- Production Vercel URL
- PiNet fallback URL
- Localhost (development only)
- watcher.pi (canonical domain)

## Deployment Checklist

When deploying or updating:

1. ✅ Verify `pi.config.json` has correct URLs
2. ✅ Check `domain-config.ts` includes all valid domains
3. ✅ Test environment detection works
4. ✅ Verify API routes return 200 status
5. ✅ Test Pi Authentication on both URLs
6. ✅ Confirm cross-tab sync works
7. ✅ Check console logs show correct environment

## Troubleshooting

### Environment not detected correctly
Check console logs:
```
[Watcher] Environment: production
[Watcher] URL: https://watcher-vb-vyqg2-kx-sa-vh.vercel.app
[Watcher] API Base: https://watcher-vb-vyqg2-kx-sa-vh.vercel.app
```

### API calls failing
1. Check Network tab in DevTools
2. Verify relative URLs are used: `/api/auth` not `https://example.com/api/auth`
3. Check Vercel logs for server-side errors

### Pi Auth not working
1. Ensure running on correct domain (Vercel or PiNet)
2. Check Pi SDK loads correctly
3. Verify `POST /api/auth` appears in logs after clicking "Allow"

## Support

For issues with:
- **Vercel deployment**: Check Vercel dashboard and logs
- **PiNet access**: Contact Pi Network support
- **App configuration**: Review this document and configuration files
