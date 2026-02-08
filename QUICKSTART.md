# Watcher - Quick Start Guide

## What is Watcher?

Watcher is a **read-only financial action oversight app** for Pi Network Testnet. It lets you load and inspect existing financial records with comprehensive verification evidence.

## Key Concepts

### One-Action App
Watcher is designed around a single action: **Load & Verify**
- You can only VIEW existing actions
- You cannot CREATE, MODIFY, or DELETE actions
- You cannot make payments or transfers

### Core Engine
All app behavior is managed by a unified Core Engine:
- Single source of truth for state
- Live updates via observer pattern
- Behavior defined by Action Configuration

### Evidence Pack
Every action includes auto-generated evidence:
- Execution Log
- Snapshot Reference
- Freeze/Release IDs
- 3-Hook Manifest (Governance, Risk, Compliance)

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: `http://localhost:3000`

### 4. Test with Examples
Click any quick example button:
- **REF-2024-A7K** - Verification Check
- **ACT-9X2-P4L** - Fund Transfer
- **PAY-5M8-Q1N** - Payment Settlement

### 5. Watch It Work
Observe the action flow:
```
Idle → Fetching → Fetched → Verified → Displayed
```

## Understanding the Flow

### Step 1: Open App
- App initializes Core Engine
- Pi Network authentication begins
- App displays ready state

### Step 2: Load Action
- Enter Reference ID (e.g., `REF-2024-A7K`)
- Click "Load" button
- Core Engine validates format

### Step 3: Verify
- Status: **Fetching** - Retrieving data
- Status: **Fetched** - Data received
- Status: **Verified** - Validation complete

### Step 4: Display
- Status: **Displayed** - Ready for oversight
- Evidence Pack shown
- Live logs available
- Oversight hooks visible

## Reference ID Formats

Valid formats for testing:

| Format | Type | Example |
|--------|------|---------|
| `REF-YYYY-XXX` | General Reference | `REF-2024-A7K` |
| `ACT-XXX-XXX` | Action ID | `ACT-9X2-P4L` |
| `PAY-XXX-XXX` | Payment Reference | `PAY-5M8-Q1N` |
| `ESC-XXX-XXX` | Escrow Reference | `ESC-3T6-R9W` |
| `CTR-XXX-XXX` | Contract Reference | `CTR-7Y4-Z3B` |

## Features Overview

### ✅ What You CAN Do
- Load existing financial actions
- View action details and metadata
- Inspect evidence packs
- Monitor live execution logs
- Check oversight hook status
- View masked Pi usernames

### ❌ What You CANNOT Do
- Create new actions
- Execute payments or transfers
- Modify action statuses
- Manage custody or keys
- Make financial promises

## Key Components

### ActionLoader
Input form for Reference IDs with quick examples

### ActionDetails
Comprehensive display of action information and evidence

### LiveLogs
Real-time execution timeline with timestamps

### ExpansionInterfaces
Placeholders for future Governance, Risk, and Compliance modules

## Architecture Overview

```
┌─────────────────────────────────────┐
│         Watcher Core Engine         │
│  (Single Source of Truth)           │
│                                     │
│  - State Management                 │
│  - Action Configuration             │
│  - Live Updates (Observer Pattern)  │
│  - Evidence Generation              │
└─────────────────────────────────────┘
           ↓          ↑
           ↓          ↑
    ┌──────────────────────┐
    │  useWatcherEngine    │
    │  (React Hook)        │
    └──────────────────────┘
           ↓          ↑
           ↓          ↑
    ┌──────────────────────┐
    │   UI Components      │
    │  - ActionLoader      │
    │  - ActionDetails     │
    │  - LiveLogs          │
    └──────────────────────┘
```

## Configuration

### Customize Action Types

Edit `lib/core-engine.ts`:

```typescript
const actionTypes: Record<string, ActionType> = {
  REF: "VERIFICATION_CHECK",
  ACT: "FUND_TRANSFER",
  PAY: "PAYMENT_SETTLEMENT",
  ESC: "ESCROW_HOLD",
  CTR: "CONTRACT_EXECUTION",
  // Add your custom type here
  NEW: "CUSTOM_ACTION_TYPE",
};
```

### Adjust Live Updates

Edit `lib/core-engine.ts`:

```typescript
export const DEFAULT_ACTION_CONFIG: ActionConfig = {
  autoRefreshInterval: 30000, // 30 seconds (or undefined to disable)
};
```

### Customize Username Masking

Edit the `maskUsername` method in `lib/core-engine.ts`:

```typescript
private maskUsername(username: string): string {
  // Customize masking logic here
  return `${username.substring(0, 2)}***${username.substring(username.length - 1)}`;
}
```

## Testing

### Manual Testing

1. **Valid Reference IDs**
   - Test each format type
   - Verify status flow
   - Check evidence generation

2. **Invalid Inputs**
   - Empty input
   - Wrong format
   - Special characters

3. **Edge Cases**
   - Very long IDs
   - Rapid consecutive loads
   - Network disconnection

### Console Debugging

The Core Engine logs all activity:

```javascript
console.log("[v0] [Watcher Engine] [INFO] Core Engine initialized")
console.log("[v0] [Watcher Engine] [SUCCESS] Action verified")
```

Open browser DevTools to monitor real-time logs.

## Deployment

### Deploy to Pi Network

1. Build production app:
```bash
npm run build
```

2. Configure on Pi Developer Portal:
   - App name: **Watcher**
   - Domain: **watcher.pi**
   - Permissions: **username** only

3. Deploy build to hosting or Pi platform

4. Test in Pi Browser

See `DEPLOYMENT.md` for detailed instructions.

## Next Steps

1. ✅ Test all reference formats
2. ✅ Verify live logs functionality
3. ✅ Check mobile responsiveness
4. ✅ Test with Pi Network authentication
5. ✅ Review evidence pack generation
6. 📋 Deploy to Pi Developer Portal
7. 🚀 Launch on Pi Network Testnet

## Support & Documentation

- **Full Docs**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Architecture**: Review `lib/core-engine.ts`
- **Pi Integration**: Check `contexts/pi-auth-context.tsx`

## Troubleshooting

**App won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Actions won't load?**
- Check reference ID format
- Open browser console for errors
- Verify Core Engine initialization

**Pi auth failing?**
- Check Pi SDK loading
- Verify Pi Developer Portal config
- Ensure testnet mode enabled

---

**Ready to launch! 🎯**

For detailed deployment instructions, see `DEPLOYMENT.md`
