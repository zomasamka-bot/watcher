/**
 * DOMAIN CONFIGURATION
 * Defines the app's domain identity and ensures consistent domain binding
 */

export const DOMAIN_CONFIG = {
  // Primary domain identity
  domain: "watcher.pi",
  appName: "Watcher",
  appFullName: "Watcher - Financial Action Oversight",
  
  // Domain-specific URLs
  urls: {
    base: "https://watcher.pi",
    testnet: "https://watcher.pi",
  },
  
  // App identity metadata
  metadata: {
    type: "oversight",
    category: "financial-verification",
    network: "testnet",
    readOnly: true,
  },
  
  // Domain verification
  verify: () => {
    if (typeof window === "undefined") return true;
    const currentDomain = window.location.hostname;
    // In development, allow localhost
    const validDomains = ["watcher.pi", "localhost", "127.0.0.1"];
    const isValid = validDomains.some(domain => currentDomain.includes(domain));
    
    if (!isValid) {
      console.warn(`[Watcher] Running on unexpected domain: ${currentDomain}`);
    }
    
    return isValid;
  }
} as const;

/**
 * Get app branding based on domain
 */
export function getAppBranding() {
  return {
    name: DOMAIN_CONFIG.appName,
    fullName: DOMAIN_CONFIG.appFullName,
    domain: DOMAIN_CONFIG.domain,
    tagline: "Financial Action Oversight • Testnet",
    footer: `Powered by ${DOMAIN_CONFIG.domain} • Made with App Studio`,
  };
}
