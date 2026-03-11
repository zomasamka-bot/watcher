# Watcher - Financial Action Oversight App

**An institutional-grade app for experiencing and verifying financial actions on Pi Network Testnet**

## Overview

Watcher is a One-Action oversight application that provides institutional transparency for financial actions on the Pi Network. It serves as a verification and inspection layer, allowing users to load and examine existing financial records with comprehensive evidence tracking.

## Core Features

### Unified Core Engine
- **Single Source of Truth**: Centralized state management via `WatcherCoreEngine`
- **Action Configuration**: All behavior defined through declarative configuration
- **Live Updates**: Real-time status changes, logs, and timestamps
- **Unified Status Flow**: `Fetched → Verified → Displayed → Failed`

### One-Action Flow
```
Open → Load/Verify existing record → Status (view/verify only)
```

### Action Inspection
- Load financial records via Reference ID or Action ID
- Display action type, status, timestamp, and reference information
- Auto-generated Evidence Pack with:
  - Execution logs
  - Snapshot references
  - Freeze/Release IDs
  - Three-hook manifest (Governance, Risk, Compliance)

### Privacy & Security
- **Masked Pi Usernames**: Automatic privacy protection by default
- **Read-Only Access**: No ability to create actions, make payments, or change custody
- **Institutional Oversight**: Verification layer with no financial promises

### Expansion Interfaces
Prepared interfaces for future institutional integration:
- **Governance Module**: Reserved for governance oversight
- **Risk Management**: Reserved for risk assessment
- **Compliance**: Reserved for regulatory compliance

## Technical Architecture

### Core Components

#### WatcherCoreEngine (`/lib/core-engine.ts`)
Unified state management engine with:
- Observable state pattern for live updates
- Action configuration system
- Evidence generation
- Username masking
- Auto-refresh capability

#### useWatcherEngine Hook (`/hooks/use-watcher-engine.ts`)
React integration layer providing:
- Live state updates
- Action loading interface
- State cleanup management

#### Components
- **ActionLoader**: Reference ID input with quick examples
- **ActionDetails**: Comprehensive action information display
- **LiveLogs**: Real-time execution timeline
- **StatusBadge**: Visual status indicators
- **ExpansionInterfaces**: Future module placeholders

## Supported Reference Formats

- `REF-XXXX-XXX` - General reference IDs
- `ACT-XXX-XXX` - Action IDs
- `PAY-XXX-XXX` - Payment references
- `ESC-XXX-XXX` - Escrow references
- `CTR-XXX-XXX` - Contract references

## Status Flow

1. **Idle**: No action loaded
2. **Fetched**: Action data retrieved
3. **Verified**: Action validated
4. **Displayed**: Action ready for oversight
5. **Failed**: Error occurred during loading

## Evidence Pack

Each loaded action includes an auto-generated evidence pack:
- **Execution Log**: Timestamped action log
- **Snapshot Reference**: State snapshot ID
- **Freeze ID**: Asset freeze reference
- **Release ID**: Asset release reference
- **Hook Manifest**: Governance, Risk, Compliance hooks (UI only)

## Installation & Deployment

### Prerequisites
- Node.js 18+ 
- Pi Network Developer Account
- App registered on Pi Developer Portal

### Environment Variables
Configure in your Pi Developer Portal:
- `NEXT_PUBLIC_PI_APP_ID`: Your Pi app ID
- `PI_API_KEY`: Backend API key
- Additional backend variables as needed

### Deploy to Pi Network
1. Build the app: `npm run build`
2. Upload to Pi Developer Portal
3. Configure app settings in portal
4. Submit for review

### Local Development
```bash
npm install
npm run dev
```

## Configuration

### Action Configuration
Customize the Core Engine behavior in `/lib/core-engine.ts`:

```typescript
export const DEFAULT_ACTION_CONFIG: ActionConfig = {
  allowedReferenceFormats: [
    /^REF-\d{4}-[A-Z0-9]+$/,
    /^ACT-[A-Z0-9]+-[A-Z0-9]+$/,
    // Add custom formats
  ],
  maxRetries: 3,
  timeoutMs: 10000,
  autoRefreshInterval: 30000, // 30 seconds
};
```

## Forbidden Operations

Watcher is strictly a read-only oversight app. The following operations are **forbidden**:
- Creating new financial actions
- Making payments or transfers
- Managing custody or private keys
- Changing action statuses
- Making financial promises or commitments

## Future Expansion

The app architecture supports future expansion for:
- Advanced governance oversight modules
- Risk management analytics
- Compliance reporting tools
- Multi-signature verification
- Cross-app action tracking

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Custom Core Engine with observer pattern
- **Pi Integration**: Pi SDK 2.0

## License

Built for Pi Network Developer Portal

## Support

For issues related to:
- **App Functionality**: Check Core Engine logs via LiveLogs component
- **Pi Network Integration**: Consult Pi Developer Documentation
- **Deployment**: Refer to Pi Developer Portal guidelines

---

**Built with App Studio for Pi Network**
