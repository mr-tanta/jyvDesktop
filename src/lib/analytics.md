# Analytics Implementation Guide

This document provides an overview of the analytics implementation in the JyvStream Desktop landing page.

## Overview

The JyvStream Desktop landing page uses Google Analytics 4 (GA4) for tracking user behavior and measuring the effectiveness of the landing page. The implementation includes:

1. A GoogleAnalytics component that loads the GA4 script and tracks page views
2. An analytics utility for tracking custom events
3. An analytics configuration file for centralizing all analytics settings
4. Event tracking for key user interactions, including downloads and feature interactions
5. Debug logging in development mode for easier debugging

## Files

- `src/components/analytics/GoogleAnalytics.tsx`: Component that loads the GA4 script and tracks page views
- `src/lib/analytics.ts`: Utility functions for tracking custom events
- `src/lib/analytics-config.ts`: Configuration file for analytics settings

## Setup

To set up analytics tracking:

1. Replace the `GA_MEASUREMENT_ID` in `src/lib/analytics-config.ts` with your actual Google Analytics measurement ID
2. Add the `GoogleAnalytics` component to the root layout (already done in `src/app/layout.tsx`)
3. Use the utility functions in `src/lib/analytics.ts` to track custom events

## Tracking Events

### Page Views

Page views are automatically tracked when the route changes using the `usePathname` and `useSearchParams` hooks in the `GoogleAnalytics` component.

### Downloads

Downloads are tracked using the `trackDownload` function:

```typescript
import { trackDownload } from '@/lib/analytics';

// Track a download event
trackDownload('Windows', '1.2.5');
```

### Feature Interactions

Feature interactions are tracked using the `trackFeatureInteraction` function:

```typescript
import { trackFeatureInteraction, EventAction } from '@/lib/analytics';

// Track a feature interaction
trackFeatureInteraction('AI Noise Suppression', EventAction.Click);
```

### Custom Events

Custom events can be tracked using the `trackEvent` function:

```typescript
import { trackEvent, EventCategory, EventAction } from '@/lib/analytics';

// Track a custom event
trackEvent({
  action: EventAction.Click,
  category: EventCategory.Engagement,
  label: 'Button Click',
  value: 1,
});
```

## Debug Mode

Debug mode is enabled in development mode (`process.env.NODE_ENV === 'development'`). When debug mode is enabled, all analytics events are logged to the console, making it easier to debug analytics tracking during development.

## Conversion Events

The following events are tracked as conversion events:

- Downloads
- Sign-ups
- Contact form submissions

## Event Parameters

The following parameters are included in analytics events:

- `platform`: The platform being downloaded (e.g., Windows, macOS)
- `version`: The version being downloaded
- `feature_name`: The name of the feature being interacted with
- `engagement_time_msec`: The time spent engaging with a feature or page

## Google Analytics Dashboard

To view analytics data, go to the Google Analytics dashboard at [https://analytics.google.com/](https://analytics.google.com/) and select the property associated with the `GA_MEASUREMENT_ID` used in the application.

## Best Practices

1. Use the utility functions in `src/lib/analytics.ts` for tracking events
2. Add tracking for important user interactions, such as clicks on call-to-action buttons
3. Use the event categories and actions defined in `src/lib/analytics.ts` for consistency
4. Add descriptive labels to events to make them easier to analyze
5. Test analytics tracking in development mode using the debug logging