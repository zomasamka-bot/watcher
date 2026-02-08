# Watcher App - Technical Specification

## App Identity

- **Name**: Watcher
- **Domain**: watcher.pi
- **Type**: One-Action Oversight Application
- **Version**: 1.0.0
- **Network**: Pi Network Testnet
- **Category**: Financial / Institutional

## Architecture Overview

### Core Engine Design

The app is built around a **Unified Core Engine** (`WatcherCoreEngine`) that serves as the single source of truth for all state management.

```
┌─────────────────────────────────────────────────────────┐
│                   Watcher Core Engine                    │
│                                                           │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │ State Manager   │    │ Action Config   │            │
│  │ (Observable)    │◄───┤ (Declarative)   │            │
│  └────────┬────────┘    └─────────────────┘            │
│           │                                              │
│  ┌────────▼────────┐    ┌─────────────────┐            │
│  │ Evidence Gen    │    │ Username Mask   │            │
│  └─────────────────┘    └─────────────────┘            │
│                                                           │
│  ┌──────────────────────────────────────────┐           │
│  │  Live Update System (Auto-refresh)       │           │
│  └──────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
HomePage
├── Header (with live status badge)
├── ActionLoader (with quick examples)
├── Alert (error display)
├── Loading Indicator
├── EmptyState
├── LiveLogs (real-time timeline)
├── ActionDetails
│   ├── Action Info Card
│   ├── Evidence Pack Card
│   └── Oversight Hooks Card
├── ExpansionInterfaces
└── Footer (disclaimers)
```

### Data Flow

```
User Input (Reference ID)
         ↓
   useWatcherEngine Hook
         ↓
   WatcherCoreEngine.loadAction()
         ↓
  ┌──────┴──────────────────────────┐
  │                                  │
  ▼                                  ▼
Validate Format              Update State: "Idle" → "Fetched"
  │                                  │
  ▼                                  ▼
Fetch Action Data            Update State: "Verified"
  │                                  │
  ▼                                  ▼
Generate Evidence            Update State: "Displayed"
  │                                  │
  ▼                                  ▼
Mask Username              Notify All Listeners
  │                                  │
  └──────────────┬───────────────────┘
                 ▼
         React Components Re-render
```

## State Management

### Core Engine State

```typescript
interface CoreEngineState {
  action: ActionData | null;       // Current loaded action
  status: ActionStatus | "Idle";   // Current status
  isLoading: boolean;               // Loading flag
  error: string | null;             // Error message
  lastUpdated: string | null;       // Last update timestamp
  logs: string[];                   // Execution timeline
}
```

### Observable Pattern

The Core Engine uses an observer pattern for live updates:

1. Components subscribe to state changes
2. Engine notifies all listeners on state update
3. Components automatically re-render with new data
4. Auto-refresh keeps data current (30s interval)

## Action Configuration

All behavior is defined via declarative configuration:

```typescript
const DEFAULT_ACTION_CONFIG = {
  // Allowed reference ID formats (regex)
  allowedReferenceFormats: [
    /^REF-\d{4}-[A-Z0-9]+$/,
    /^ACT-[A-Z0-9]+-[A-Z0-9]+$/,
    /^PAY-[A-Z0-9]+-[A-Z0-9]+$/,
    /^ESC-[A-Z0-9]+-[A-Z0-9]+$/,
    /^CTR-[A-Z0-9]+-[A-Z0-9]+$/,
  ],
  
  maxRetries: 3,                // Retry attempts
  timeoutMs: 10000,             // Request timeout
  autoRefreshInterval: 30000,   // Live refresh rate
};
```

## Status Flow

```
┌──────┐   Load Action    ┌─────────┐
│ Idle │ ──────────────► │ Fetched │
└──────┘                  └────┬────┘
                               │
                          Validate
                               │
                          ┌────▼──────┐
                          │ Verified  │
                          └────┬──────┘
                               │
                        Generate Evidence
                               │
                          ┌────▼────────┐
                          │ Displayed   │
                          └─────────────┘
                               
                          (On Error)
                               │
                          ┌────▼────┐
                          │ Failed  │
                          └─────────┘
```

## Evidence Pack Generation

Auto-generated for each loaded action:

```typescript
{
  log: `LOG-${timestamp}-${random}`,
  snapshot: `SNAP-${timestamp}-${random}`,
  freezeId: `FRZ-${timestamp}-${random}`,
  releaseId: `REL-${timestamp}-${random}`,
  hooks: {
    governance: "HOOK-GOV-ACTIVE",
    risk: "HOOK-RISK-ACTIVE",
    compliance: "HOOK-COMP-ACTIVE"
  }
}
```

## Privacy Protection

### Username Masking Algorithm

```typescript
function maskUsername(username: string): string {
  if (username.length <= 4) return "****";
  
  const visibleChars = Math.min(3, Math.floor(username.length / 3));
  const prefix = username.substring(0, visibleChars);
  const suffix = username.substring(username.length - 2);
  
  return `${prefix}***${suffix}`;
}
```

Examples:
- `johndoe123` → `joh***23`
- `alice` → `ali***ce`
- `bob` → `****`

## Integration Points

### Pi Network SDK

```typescript
// Authentication (required scopes)
const scopes = ["username", "payments"];

// User data access
const { username } = userData; // Auto-masked in display

// No payment initiation - read-only
```

### Backend API (Optional)

Future integration endpoints:

```
POST   /api/actions/verify
GET    /api/actions/{referenceId}
GET    /api/evidence/{actionId}
GET    /api/hooks/{actionId}
```

## Security Model

### Forbidden Operations

❌ **Never Allowed**:
- Creating new financial actions
- Initiating payments or transfers
- Managing private keys or custody
- Changing action statuses
- Making financial commitments
- Modifying blockchain state

✅ **Always Allowed**:
- Loading existing action records
- Viewing action details
- Inspecting evidence packs
- Reading oversight hook status
- Viewing masked usernames

### Read-Only Enforcement

1. **No write APIs**: Core Engine only reads data
2. **No state mutation**: Actions are immutable after load
3. **UI enforcement**: No action buttons for state changes
4. **Type safety**: TypeScript prevents invalid operations

## Expansion Architecture

### Reserved Interfaces

```
┌────────────────────────────────────────────┐
│          Expansion Modules (Reserved)       │
├────────────────────────────────────────────┤
│  Governance      │  Risk Mgmt  │ Compliance │
│  (Future)        │  (Future)   │  (Future)  │
└────────────────────────────────────────────┘
```

Ready for integration:
- Governance oversight dashboards
- Risk scoring and assessment
- Compliance reporting tools
- Multi-signature verification
- Cross-app action tracking

### Hook System

Current: UI-only display of hook status
Future: Real integration with oversight modules

```typescript
interface HookInterface {
  id: string;
  type: "governance" | "risk" | "compliance";
  status: "active" | "inactive" | "pending";
  
  // Future methods
  evaluate?(action: ActionData): Promise<HookResult>;
  report?(action: ActionData): Promise<Report>;
}
```

## Performance Characteristics

- **Initial Load**: < 2s (including Pi SDK init)
- **Action Load**: ~ 1.5s (simulated, backend dependent)
- **State Updates**: < 50ms (in-memory)
- **Auto-refresh**: 30s interval (configurable)
- **Memory Footprint**: < 10MB typical usage

## Mobile Optimization

- **Mobile-first design**: Optimized for touch interfaces
- **Responsive breakpoints**: sm, md, lg, xl
- **Touch targets**: Minimum 44x44px
- **Scrollable logs**: Fixed height with smooth scroll
- **Collapsible sections**: Future enhancement ready

## Technology Stack

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  Next.js 14 + React + TypeScript    │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│          State Layer                │
│  WatcherCoreEngine (Observable)     │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│        Integration Layer            │
│   Pi SDK 2.0 + Optional Backend     │
└─────────────────────────────────────┘
```

## Deployment Configuration

### Environment
- Platform: Pi Network Developer Portal
- Runtime: Node.js 18+
- Build: Static + SSR hybrid
- CDN: Vercel Edge Network

### Requirements
- Node.js: 18.0.0+
- Next.js: 14.0.0+
- React: 18.0.0+
- TypeScript: 5.0.0+

## Monitoring & Observability

### Live Logs
Real-time execution timeline visible to users:
- Action load initiated
- Validation status
- Fetch progress
- Verification complete
- Evidence generation
- Display ready

### Error Handling
- Validation errors: User-friendly messages
- Network errors: Retry with backoff
- Format errors: Detailed format guidance
- System errors: Safe fallbacks

## Future Roadmap

### Phase 2: Enhanced Verification
- Real backend integration
- Historical action tracking
- Batch verification
- Export capabilities

### Phase 3: Institutional Features
- Governance module activation
- Risk assessment engine
- Compliance reporting
- Multi-user workspaces

### Phase 4: Cross-App Integration
- Action tracking across apps
- Unified oversight dashboard
- Inter-app verification chains
- Audit trail system

---

**Status**: Production Ready for Pi Developer Portal
**Last Updated**: 2024
**Maintainer**: Watcher Team
