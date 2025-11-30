'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  // Don't render analytics in development or if no measurement ID
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper functions for tracking events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Common tracking helpers
export const analytics = {
  // Track page views (for SPA navigation)
  pageView: (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  },

  // Track contact form submission
  contactFormSubmit: () => {
    trackEvent('submit', 'contact_form', 'Contact Page');
  },

  // Track newsletter signup
  newsletterSignup: () => {
    trackEvent('signup', 'newsletter', 'Newsletter Form');
  },

  // Track CTA clicks
  ctaClick: (ctaName: string) => {
    trackEvent('click', 'cta', ctaName);
  },

  // Track project views
  projectView: (projectName: string) => {
    trackEvent('view', 'project', projectName);
  },

  // Track blog post reads
  blogPostRead: (postTitle: string) => {
    trackEvent('read', 'blog', postTitle);
  },

  // Track outbound links
  outboundLink: (url: string) => {
    trackEvent('click', 'outbound_link', url);
  },
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
