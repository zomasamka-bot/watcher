# WATCHER - TESTNET TESTING GUIDE
## Complete Testing Protocol for Pi Browser

---

## PRE-TESTING CHECKLIST

### Environment Setup
- [ ] Pi Browser installed
- [ ] Pi account authenticated
- [ ] Testnet mode enabled
- [ ] Network connection stable

### Application Status
- [x] Core Engine implemented
- [x] Cross-tab sync active
- [x] Domain binding configured
- [x] All buttons functional
- [x] Mobile responsive
- [x] Error handling complete

---

## TEST SUITE 1: BASIC FUNCTIONALITY

### Test 1.1: Application Load
**Objective**: Verify app loads correctly

**Steps**:
1. Open Pi Browser
2. Navigate to watcher.pi
3. Wait for page load

**Expected Results**:
- ✓ Header displays "Watcher"
- ✓ Action loader visible
- ✓ Empty state shown
- ✓ Footer displays disclaimers
- ✓ No console errors

**Status**: _____

---

### Test 1.2: Example Action Load
**Objective**: Test quick example buttons

**Steps**:
1. Click "Verification Check" button
2. Observe loading state
3. Wait for results

**Expected Results**:
- ✓ Loading spinner appears
- ✓ Live logs update
- ✓ Status badge shows progression
- ✓ Action details displayed
- ✓ Evidence pack visible

**Reference ID**: REF-2024-A7K

**Status**: _____

---

### Test 1.3: Manual Reference ID Entry
**Objective**: Test manual input

**Steps**:
1. Enter "ACT-9X2-P4L" in input field
2. Click "Load" button
3. Wait for verification

**Expected Results**:
- ✓ Input validation passes
- ✓ Action type: FUND_TRANSFER
- ✓ Status: Verified
- ✓ Evidence generated
- ✓ Timestamp displayed

**Status**: _____

---

### Test 1.4: Invalid Reference ID
**Objective**: Test error handling

**Steps**:
1. Enter "INVALID-123" in input
2. Click "Load" button
3. Observe error

**Expected Results**:
- ✓ Error alert appears
- ✓ Clear error message
- ✓ Status badge shows "Failed"
- ✓ Can retry with valid ID

**Status**: _____

---

### Test 1.5: Clear Action
**Objective**: Test state reset

**Steps**:
1. Load any action
2. Wait for display
3. Scroll down
4. Click "Clear Action" (if implemented) or reload

**Expected Results**:
- ✓ Action details disappear
- ✓ Status returns to "Idle"
- ✓ Logs cleared
- ✓ Empty state shown

**Status**: _____

---

## TEST SUITE 2: CROSS-TAB SYNCHRONIZATION

### Test 2.1: Basic Sync
**Objective**: Verify state syncs between tabs

**Steps**:
1. Open watcher.pi in Tab A
2. Load action "PAY-5M8-Q1N"
3. Open watcher.pi in Tab B (new tab)
4. Observe Tab B

**Expected Results**:
- ✓ Tab B shows same action as Tab A
- ✓ Status matches
- ✓ Logs synchronized
- ✓ Timestamps identical

**Status**: _____

---

### Test 2.2: Tab B Loads New Action
**Objective**: Test sync from second tab

**Steps**:
1. Have Tab A and Tab B open
2. In Tab B, load "ESC-3T6-R9W"
3. Check Tab A

**Expected Results**:
- ✓ Tab A updates to new action
- ✓ Both tabs show ESC-3T6-R9W
- ✓ Live logs update in both tabs
- ✓ Status badges match

**Status**: _____

---

### Test 2.3: Multiple Tabs
**Objective**: Test sync with 3+ tabs

**Steps**:
1. Open 3 tabs: Tab A, B, C
2. In Tab A, load action
3. Observe Tab B and C
4. Close Tab A
5. In Tab B, load new action
6. Observe Tab C

**Expected Results**:
- ✓ All tabs sync initially
- ✓ Closing tab doesn't break sync
- ✓ Remaining tabs continue syncing
- ✓ No conflicts or errors

**Status**: _____

---

### Test 2.4: State Persistence
**Objective**: Test localStorage persistence

**Steps**:
1. Load action "CTR-7H4-M2P"
2. Close all browser tabs
3. Reopen watcher.pi
4. Check if action displayed

**Expected Results**:
- ✓ Previous action restored
- ✓ Status persisted
- ✓ Logs preserved
- ✓ Evidence intact

**Status**: _____

---

## TEST SUITE 3: MOBILE RESPONSIVENESS

### Test 3.1: Mobile Layout
**Objective**: Verify mobile display

**Device**: _____________

**Steps**:
1. Open in Pi Browser on mobile
2. Observe layout
3. Test all interactions

**Expected Results**:
- ✓ Text readable (no zoom needed)
- ✓ Buttons touch-friendly
- ✓ Cards stack properly
- ✓ Logs scrollable
- ✓ Footer visible

**Status**: _____

---

### Test 3.2: Portrait/Landscape
**Objective**: Test orientation changes

**Steps**:
1. Load action in portrait
2. Rotate to landscape
3. Rotate back to portrait

**Expected Results**:
- ✓ Layout adjusts smoothly
- ✓ No content cut off
- ✓ State preserved
- ✓ Interactions still work

**Status**: _____

---

### Test 3.3: Touch Interactions
**Objective**: Test mobile gestures

**Steps**:
1. Tap input field
2. Tap example buttons
3. Scroll logs
4. Expand evidence sections

**Expected Results**:
- ✓ Keyboard appears for input
- ✓ Buttons respond to tap
- ✓ Smooth scrolling
- ✓ Expandable work correctly

**Status**: _____

---

## TEST SUITE 4: PI NETWORK INTEGRATION

### Test 4.1: Pi Authentication
**Objective**: Verify Pi SDK integration

**Steps**:
1. Open app (not authenticated)
2. Observe auth flow
3. Complete Pi authentication

**Expected Results**:
- ✓ Pi SDK loads
- ✓ Auth prompt appears
- ✓ Username permission requested
- ✓ Login successful

**Status**: _____

---

### Test 4.2: Username Masking
**Objective**: Test privacy feature

**Pi Username**: _____________

**Steps**:
1. Authenticate with Pi
2. Load any action
3. Check "Executed By" field

**Expected Results**:
- ✓ Username appears
- ✓ Middle characters masked (***) 
- ✓ Format: XXX***XX
- ✓ Readable but private

**Status**: _____

---

### Test 4.3: Testnet Mode
**Objective**: Verify testnet operation

**Steps**:
1. Check footer
2. Verify all actions use testnet data
3. Confirm no mainnet operations

**Expected Results**:
- ✓ "Testnet Only" in footer
- ✓ No real Pi transactions
- ✓ Test data only
- ✓ Safe to experiment

**Status**: _____

---

## TEST SUITE 5: LIVE UPDATES

### Test 5.1: Real-Time Logs
**Objective**: Test live log updates

**Steps**:
1. Load action
2. Watch live logs panel
3. Observe updates in real-time

**Expected Results**:
- ✓ Logs appear progressively
- ✓ Timestamps accurate
- ✓ Auto-scroll to latest
- ✓ Clear progression shown

**Status**: _____

---

### Test 5.2: Status Badge Updates
**Objective**: Test status indicator

**Steps**:
1. Load action
2. Watch status badge in header
3. Observe state changes

**Expected Results**:
- ✓ Shows "Fetched"
- ✓ Changes to "Verified"
- ✓ Finally "Displayed"
- ✓ Color coding correct

**Status**: _____

---

### Test 5.3: Auto-Refresh (if enabled)
**Objective**: Test auto-refresh feature

**Steps**:
1. Load action
2. Wait 30+ seconds
3. Check for updates

**Expected Results**:
- ✓ Log entry "Auto-refresh"
- ✓ Timestamp updates
- ✓ No page reload needed
- ✓ Smooth updates

**Status**: _____

---

## TEST SUITE 6: EVIDENCE PACK

### Test 6.1: Evidence Display
**Objective**: Verify evidence pack

**Steps**:
1. Load action
2. Scroll to evidence section
3. Check all fields

**Expected Results**:
- ✓ Log ID displayed
- ✓ Snapshot ID shown
- ✓ Freeze ID present
- ✓ Release ID visible
- ✓ All hooks active

**Status**: _____

---

### Test 6.2: Oversight Hooks
**Objective**: Test 3-hook manifest

**Steps**:
1. View evidence pack
2. Check hooks section
3. Verify statuses

**Expected Results**:
- ✓ Governance: ACTIVE
- ✓ Risk: ACTIVE
- ✓ Compliance: ACTIVE
- ✓ All green indicators

**Status**: _____

---

## TEST SUITE 7: EXPANSION INTERFACES

### Test 7.1: Reserved Modules
**Objective**: Verify future interfaces

**Steps**:
1. Scroll to expansion section
2. View module cards
3. Check descriptions

**Expected Results**:
- ✓ Governance card visible
- ✓ Risk card visible
- ✓ Compliance card visible
- ✓ All marked "Reserved"

**Status**: _____

---

## TEST SUITE 8: ERROR SCENARIOS

### Test 8.1: Network Offline
**Objective**: Test offline behavior

**Steps**:
1. Disable network
2. Try to load action
3. Observe error

**Expected Results**:
- ✓ Error message shown
- ✓ Graceful failure
- ✓ Can retry when online
- ✓ No app crash

**Status**: _____

---

### Test 8.2: Long Reference ID
**Objective**: Test input limits

**Steps**:
1. Enter very long reference ID
2. Try to load
3. Check validation

**Expected Results**:
- ✓ Validation catches issue
- ✓ Clear error message
- ✓ Input cleared or highlighted
- ✓ Can enter valid ID

**Status**: _____

---

### Test 8.3: Rapid Button Clicks
**Objective**: Test loading state lock

**Steps**:
1. Click Load button
2. Immediately click again multiple times
3. Observe behavior

**Expected Results**:
- ✓ Button disabled during load
- ✓ Only one request sent
- ✓ No duplicate actions
- ✓ Smooth completion

**Status**: _____

---

## TEST SUITE 9: PERFORMANCE

### Test 9.1: Page Load Speed
**Objective**: Measure load time

**Connection**: _____________

**Steps**:
1. Clear browser cache
2. Navigate to watcher.pi
3. Measure time to interactive

**Expected Results**:
- ✓ First paint < 1.5s
- ✓ Interactive < 2.5s
- ✓ Smooth rendering
- ✓ No layout shift

**Time**: _____ seconds

**Status**: _____

---

### Test 9.2: Action Load Speed
**Objective**: Measure action load time

**Steps**:
1. Click example action
2. Start timer
3. Stop when displayed

**Expected Results**:
- ✓ Complete in < 2s
- ✓ Progressive updates
- ✓ No freezing
- ✓ Responsive UI

**Time**: _____ seconds

**Status**: _____

---

### Test 9.3: Memory Usage
**Objective**: Check resource usage

**Steps**:
1. Open DevTools
2. Check memory usage
3. Load multiple actions
4. Monitor for leaks

**Expected Results**:
- ✓ Reasonable memory use
- ✓ No significant leaks
- ✓ Smooth after multiple loads
- ✓ Tab responsive

**Status**: _____

---

## TEST SUITE 10: DOMAIN & BRANDING

### Test 10.1: Domain Identity
**Objective**: Verify watcher.pi identity

**Steps**:
1. Check browser URL
2. Review header
3. Check footer
4. View documentation

**Expected Results**:
- ✓ URL shows watcher.pi
- ✓ Header says "Watcher"
- ✓ Footer mentions watcher.pi
- ✓ Consistent branding

**Status**: _____

---

### Test 10.2: Visual Identity
**Objective**: Verify design consistency

**Steps**:
1. Observe logo (Eye icon)
2. Check color scheme (Blue)
3. Read tagline
4. View overall design

**Expected Results**:
- ✓ Eye icon prominent
- ✓ Blue primary color
- ✓ "Financial Action Oversight"
- ✓ Professional appearance

**Status**: _____

---

## FINAL VERIFICATION

### All Tests Completed
- [ ] Suite 1: Basic Functionality (5 tests)
- [ ] Suite 2: Cross-Tab Sync (4 tests)
- [ ] Suite 3: Mobile Responsive (3 tests)
- [ ] Suite 4: Pi Integration (3 tests)
- [ ] Suite 5: Live Updates (3 tests)
- [ ] Suite 6: Evidence Pack (2 tests)
- [ ] Suite 7: Expansion (1 test)
- [ ] Suite 8: Error Scenarios (3 tests)
- [ ] Suite 9: Performance (3 tests)
- [ ] Suite 10: Domain & Branding (2 tests)

**Total Tests**: 29

**Passed**: _____ / 29

**Failed**: _____ / 29

**Pass Rate**: _____ %

---

## ISSUES FOUND

### Critical Issues
1. _______________________________
2. _______________________________

### Minor Issues
1. _______________________________
2. _______________________________

### Enhancement Suggestions
1. _______________________________
2. _______________________________

---

## TESTER INFORMATION

**Tester Name**: _______________________________

**Date**: _______________________________

**Device**: _______________________________

**Pi Browser Version**: _______________________________

**Network**: _______________________________

---

## FINAL RECOMMENDATION

**Ready for Production**: [ ] YES  [ ] NO

**Additional Testing Needed**: _______________________________

**Comments**: 
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## SIGN-OFF

**Tested By**: _______________________________

**Date**: _______________________________

**Signature**: _______________________________

---

**Document Version**: 1.0  
**Last Updated**: 2024-01-19  
**Application**: Watcher (watcher.pi)
