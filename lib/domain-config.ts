/**
 * DOMAIN CONFIGURATION
 * Defines the app's domain identity and ensures consistent domain binding
 * Supports multiple deployment environments
 */

export const DOMAIN_CONFIG = {
  // Primary domain identity
  domain: "watcher.pi",
  appName: "Watcher",
  appFullName: "Watcher - Financial Action Oversight",
  
  // Production and fallback URLs
  urls: {
    production: "https://watcher-vb-vyqg2-kx-sa-vh.vercel.app",
    pinet: "https://watcher4942.pinet.com",
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
  
  // Domain verification - expanded to include production URLs
  verify: () => {
    if (typeof window === "undefined") return true;
    const currentDomain = window.location.hostname;
    
    // Valid domains for this app
    const validDomains = [
      "watcher.pi",
      "watcher-vb-vyqg2-kx-sa-vh.vercel.app",
      "watcher4942.pinet.com",
      "localhost",
      "127.0.0.1"
    ];
    
    const isValid = validDomains.some(domain => currentDomain.includes(domain));
    
    if (!isValid) {
      console.warn(`[Watcher] Running on unexpected domain: ${currentDomain}`);
    }
    
    return isValid;
  },
  
  // Environment detection
  getEnvironment: () => {
    if (typeof window === "undefined") return "server";
    const hostname = window.location.hostname;
    
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      return "development";
    }
    if (hostname.includes("vercel.app")) {
      return "production";
    }
    if (hostname.includes("pinet.com")) {
      return "pinet";
    }
    return "watcher.pi";
  },
  
  // Get current base URL
  getCurrentBaseUrl: () => {
    if (typeof window === "undefined") return DOMAIN_CONFIG.urls.production;
    const hostname = window.location.hostname;
    
    if (hostname.includes("vercel.app")) {
      return DOMAIN_CONFIG.urls.production;
    }
    if (hostname.includes("pinet.com")) {
      return DOMAIN_CONFIG.urls.pinet;
    }
    if (hostname.includes("localhost")) {
      return `http://localhost:${window.location.port || 3000}`;
    }
    return DOMAIN_CONFIG.urls.base;
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
