/**
 * ENVIRONMENT CONFIGURATION
 * Detects and manages different deployment environments
 */

export type Environment = "development" | "production" | "pinet" | "watcher.pi" | "server";

export const ENV_CONFIG = {
  // Environment URLs
  urls: {
    production: "https://watcher-vb-vyqg2-kx-sa-vh.vercel.app",
    pinet: "https://watcher4942.pinet.com",
    local: "http://localhost:3000",
  },
  
  // Detect current environment
  getCurrentEnvironment: (): Environment => {
    if (typeof window === "undefined") return "server";
    
    const hostname = window.location.hostname;
    
    if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
      return "development";
    }
    if (hostname.includes("watcher-vb-vyqg2-kx-sa-vh.vercel.app")) {
      return "production";
    }
    if (hostname.includes("watcher4942.pinet.com")) {
      return "pinet";
    }
    if (hostname.includes("watcher.pi")) {
      return "watcher.pi";
    }
    
    return "development";
  },
  
  // Get API base URL for current environment
  getApiBaseUrl: (): string => {
    if (typeof window === "undefined") {
      return process.env.NEXT_PUBLIC_API_BASE_URL || "";
    }
    
    const env = ENV_CONFIG.getCurrentEnvironment();
    const origin = window.location.origin;
    
    // Use relative URLs to ensure API calls work in all environments
    return origin;
  },
  
  // Check if running in production
  isProduction: (): boolean => {
    const env = ENV_CONFIG.getCurrentEnvironment();
    return env === "production" || env === "pinet" || env === "watcher.pi";
  },
  
  // Check if running on PiNet
  isPiNet: (): boolean => {
    const env = ENV_CONFIG.getCurrentEnvironment();
    return env === "pinet";
  },
  
  // Check if running on Vercel production
  isVercelProduction: (): boolean => {
    const env = ENV_CONFIG.getCurrentEnvironment();
    return env === "production";
  },
  
  // Get environment info for logging
  getEnvironmentInfo: () => {
    if (typeof window === "undefined") {
      return {
        environment: "server" as Environment,
        url: "N/A",
        apiBaseUrl: "N/A",
      };
    }
    
    return {
      environment: ENV_CONFIG.getCurrentEnvironment(),
      url: window.location.origin,
      apiBaseUrl: ENV_CONFIG.getApiBaseUrl(),
    };
  }
} as const;

// Log environment on client side
if (typeof window !== "undefined") {
  const envInfo = ENV_CONFIG.getEnvironmentInfo();
  console.log("[Watcher] Environment:", envInfo.environment);
  console.log("[Watcher] URL:", envInfo.url);
  console.log("[Watcher] API Base:", envInfo.apiBaseUrl);
}
