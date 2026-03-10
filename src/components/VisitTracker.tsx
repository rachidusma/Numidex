'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitTracker() {
  const pathname = usePathname();
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only track if we are running in the browser
    if (typeof window === 'undefined') return;
    
    // Ignore admin routes
    if (pathname && pathname.startsWith('/admin')) return;

    // We only want to track once per session to avoid overcounting (especially in StrictMode or during navigation)
    if (sessionStorage.getItem('visit_tracked') === 'true' || trackedRef.current) {
      return;
    }

    // Track the visit
    const trackVisit = async () => {
      trackedRef.current = true;
      sessionStorage.setItem('visit_tracked', 'true');
      
      try {
        await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: pathname }),
          // Don't wait for the request to finish before navigating away
          keepalive: true,
        });
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
