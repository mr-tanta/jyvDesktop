import { GA_MEASUREMENT_ID, DEBUG_MODE, CONVERSION_EVENTS, EVENT_PARAMETERS } from './analytics-config';

// Define event categories
export enum EventCategory {
  Engagement = 'engagement',
  Conversion = 'conversion',
  Navigation = 'navigation',
  Download = 'download',
  Feature = 'feature',
}

// Define event actions
export enum EventAction {
  // Engagement events
  Click = 'click',
  Scroll = 'scroll',
  View = 'view',
  Play = 'play',
  Pause = 'pause',

  // Conversion events
  Download = 'download',
  SignUp = 'sign_up',
  Subscribe = 'subscribe',
  Contact = 'contact',

  // Navigation events
  Navigate = 'navigate',

  // Feature interaction events
  Toggle = 'toggle',
  Select = 'select',
  Adjust = 'adjust',
}

// Event tracking interface
interface TrackEventProps {
  action: EventAction;
  category: EventCategory;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any; // Additional custom parameters
}

/**
 * Track a custom event in Google Analytics
 */
export const trackEvent = ({
  action,
  category,
  label,
  value,
  nonInteraction = false,
  ...customParams
}: TrackEventProps): void => {
  // Check if gtag is available (client-side only)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Prepare event parameters
    const eventParams = {
      event_category: category,
      ...(label && { event_label: label }),
      ...(value !== undefined && { value }),
      non_interaction: nonInteraction,
      ...customParams,
    };

    // Log event in development mode
    if (DEBUG_MODE) {
      console.log('Analytics Event:', {
        action,
        category,
        params: eventParams
      });
    }

    // Send event to Google Analytics
    window.gtag('event', action, eventParams);
  }
};

/**
 * Track a download event
 */
export const trackDownload = (platform: string, version: string): void => {
  trackEvent({
    action: EventAction.Download,
    category: EventCategory.Conversion, // Downloads are conversion events
    label: platform,
    [EVENT_PARAMETERS.PLATFORM]: platform,
    [EVENT_PARAMETERS.VERSION]: version,
    // Mark this as a conversion event
    conversion_event: CONVERSION_EVENTS.DOWNLOAD,
  });
};

/**
 * Track a feature interaction
 */
export const trackFeatureInteraction = (featureName: string, action: EventAction): void => {
  trackEvent({
    action,
    category: EventCategory.Feature,
    label: featureName,
    [EVENT_PARAMETERS.FEATURE_NAME]: featureName,
  });
};

/**
 * Track a page view (for manual tracking when needed)
 */
export const trackPageView = (url: string, title?: string): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const pageViewParams = {
      page_path: url,
      page_title: title || document.title,
    };

    // Log page view in development mode
    if (DEBUG_MODE) {
      console.log('Page View:', {
        url,
        title: title || document.title
      });
    }

    window.gtag('event', 'page_view', pageViewParams);
  }
};
