# Watcher - Deployment Guide for Pi Network Developer Portal

## Pre-Deployment Checklist

### 1. App Configuration
- [ ] App name: **Watcher**
- [ ] App domain: **watcher.pi**
- [ ] App category: **Finance / Institutional**
- [ ] App type: **One-Action Oversight App**

### 2. Required Permissions
Configure these in Pi Developer Portal:

**Required Scopes:**
- `username` - For user identification (masked by default)
- `payments` - For payment-related action verification (read-only)

**Note**: Watcher does NOT initiate payments, it only verifies existing actions.

### 3. Environment Variables

Set these in your Pi Developer Portal environment:

```bash
# Pi Network Configuration
NEXT_PUBLIC_PI_APP_ID=your_app_id_here
PI_API_KEY=your_api_key_here

# Optional: Backend Integration
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```

### 4. Backend Requirements (Optional)

If integrating with a verification backend:

**Endpoints Needed:**
- `POST /api/actions/verify` - Verify action by reference ID
- `GET /api/actions/{referenceId}` - Retrieve action details
- `GET /api/evidence/{actionId}` - Get evidence pack

**Response Format:**
```typescript
{
  referenceId: string;
  actionId: string;
  type: string;
  status: "Fetched" | "Verified" | "Displayed" | "Failed";
  timestamp: string;
  evidence: {
    log: string;
    snapshot: string;
    freezeId: string;
    releaseId: string;
    hooks: {
      governance: string;
      risk: string;
      compliance: string;
    };
  };
  executedBy?: string; // Will be auto-masked
  originApp?: string;
}
```

## Build & Deploy

### Step 1: Build Production Version

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test production build locally
npm start
```

### Step 2: Verify Build

Check that:
- [ ] All pages load without errors
- [ ] Action loader functions correctly
- [ ] Status flow works: Fetched → Verified → Displayed
- [ ] Live logs display real-time updates
- [ ] Evidence pack generates correctly
- [ ] Username masking works
- [ ] Mobile responsiveness is optimal

### Step 3: Package for Deployment

Create deployment package:
```bash
# Create ZIP of build files
zip -r watcher-app.zip .next/ public/ package.json next.config.mjs
```

Or use Git integration if available in Developer Portal.

### Step 4: Upload to Pi Developer Portal

1. **Login** to Pi Developer Portal
2. **Navigate** to "My Apps" → "Create New App"
3. **Fill App Details**:
   - App Name: `Watcher`
   - Short Name: `Watcher`
   - Domain: `watcher.pi`
   - Category: Finance
   - Description: "Financial Action Oversight & Verification on Testnet"
4. **Upload** build files or connect Git repository
5. **Configure** environment variables
6. **Set permissions**: username, payments (read-only)
7. **Submit** for review

## App Store Listing

### App Title
```
Watcher - Financial Action Oversight
```

### Short Description (80 chars)
```
Institutional oversight app for verifying financial actions on Pi Testnet
```

### Full Description
```
Watcher is an institutional-grade oversight application that provides transparency and verification for financial actions on the Pi Network Testnet.

KEY FEATURES:
• Load and inspect existing financial records via Reference ID
• Real-time status tracking (Fetched → Verified → Displayed)
• Comprehensive evidence packs with execution logs
• Three-hook oversight manifest (Governance, Risk, Compliance)
• Privacy-protected with masked Pi usernames
• Read-only access - no financial actions permitted

INSTITUTIONAL TRANSPARENCY:
Watcher serves as a verification layer, allowing users to examine action flows, reference IDs, statuses, timestamps, and execution evidence. Perfect for institutional oversight, audit trails, and transparency requirements.

TESTNET ONLY:
This app operates on Pi Network Testnet for safe verification and inspection of financial actions without real-world impact.

EXPANSION READY:
Architecture prepared for future integration with governance, risk management, and compliance modules.
```

### Screenshots Required

Prepare these screenshots (recommended 1080x1920 for mobile):
1. Home screen with Action Loader
2. Action Details with evidence pack
3. Live Logs showing status flow
4. Oversight Hooks display
5. Expansion Interfaces section

### Keywords
```
financial, oversight, verification, institutional, audit, compliance, governance, risk, testnet, transparency
```

## Testing on Testnet

### Test Scenarios

1. **Valid Reference IDs**:
   - `REF-2024-A7K` - Should load verification check
   - `ACT-9X2-P4L` - Should load fund transfer
   - `PAY-5M8-Q1N` - Should load payment settlement

2. **Invalid Reference IDs**:
   - `INVALID-123` - Should show error
   - `REF-ABC` - Should show format error

3. **Status Flow**:
   - Watch status progress: Idle → Fetched → Verified → Displayed
   - Check Live Logs for timeline

4. **Evidence Pack**:
   - Verify all evidence fields populate
   - Check hook manifest displays correctly

5. **Privacy**:
   - Confirm Pi username is masked (e.g., `abc***xy`)
   - Verify no sensitive data exposed

## Post-Deployment

### Monitoring

Monitor these metrics:
- Action load success rate
- Average verification time
- Error rates by reference type
- User engagement with expansion interfaces

### Maintenance

Regular checks:
- [ ] Core Engine performance
- [ ] Live log accuracy
- [ ] Status flow reliability
- [ ] Evidence pack generation
- [ ] Mobile responsiveness

### Support

For user issues:
1. Check Live Logs for error details
2. Verify reference ID format
3. Confirm Pi SDK initialization
4. Review Core Engine state

## Compliance & Security

### Security Measures
- ✅ Username masking by default
- ✅ Read-only data access
- ✅ No payment initiation capability
- ✅ No private key handling
- ✅ No custody operations
- ✅ Testnet only operation

### Compliance Notes
- App does NOT handle real financial transactions
- App does NOT store sensitive user data
- App does NOT make financial promises
- App operates purely as oversight/verification layer

## Troubleshooting

### Common Issues

**Issue**: Actions not loading
- **Check**: Reference ID format
- **Check**: Backend API connectivity
- **Check**: Pi SDK initialization

**Issue**: Status stuck on "Fetched"
- **Check**: Network connectivity
- **Check**: Backend response format
- **Check**: Core Engine logs

**Issue**: Evidence pack incomplete
- **Check**: Evidence generation logic
- **Check**: API response completeness
- **Check**: Hook manifest data

## Version Management

Current Version: **1.0.0**

Version tracking:
- Major: Core Engine changes
- Minor: Feature additions
- Patch: Bug fixes and improvements

---

## Launch Checklist

Final checks before going live:
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Screenshots prepared
- [ ] Environment variables set
- [ ] Permissions configured
- [ ] Security review passed
- [ ] Mobile testing complete
- [ ] App Store listing ready
- [ ] Support plan in place
- [ ] Monitoring setup complete

**Ready for Pi Developer Portal submission!** 🚀
