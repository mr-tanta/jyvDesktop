/**
 * Google Analytics Configuration
 * 
 * This file contains configuration settings for Google Analytics.
 * Replace the GA_MEASUREMENT_ID with your actual Google Analytics measurement ID.
 */

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Debug mode (set to true to enable console logging of analytics events)
export const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Configuration for Google Analytics
export const GA_CONFIG = {
  // Don't automatically send page views (we'll handle this manually for better SPA tracking)
  send_page_view: false,
  
  // Cookie settings
  cookie_domain: 'auto',
  cookie_flags: 'SameSite=None;Secure',
  
  // User consent settings (adjust based on your privacy policy)
  // See: https://developers.google.com/analytics/devguides/collection/ga4/reference/config
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
};

// Conversion events configuration
export const CONVERSION_EVENTS = {
  DOWNLOAD: 'download',
  SIGN_UP: 'sign_up',
  CONTACT: 'contact',
};

// Event parameters for enhanced measurement
export const EVENT_PARAMETERS = {
  // Common parameters
  SOURCE: 'source',
  MEDIUM: 'medium',
  CAMPAIGN: 'campaign',
  
  // Download parameters
  PLATFORM: 'platform',
  VERSION: 'version',
  
  // Feature parameters
  FEATURE_NAME: 'feature_name',
  
  // Engagement parameters
  ENGAGEMENT_TIME: 'engagement_time_msec',
};