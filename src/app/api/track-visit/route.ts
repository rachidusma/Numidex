import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    const userAgent = request.headers.get('user-agent') || 'unknown';
    // Simplified IP extraction. In production behind proxies, you'd use 'x-forwarded-for'
    let ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Clean up IP address if it contains multiple via proxy e.g "1.2.3.4, 5.6.7.8"
    if (ipAddress && ipAddress !== 'unknown') {
      ipAddress = ipAddress.split(',')[0].trim();
    }
    
    let country = 'Unknown';
    
    // Attempt to resolve Country from IP Using free ip-api.com
    // Note: ip-api is HTTP only, and limits apply. For rigorous production, use Vercel Geo headers or a paid service.
    // We skip localhost lookups
    if (ipAddress && ipAddress !== 'unknown' && ipAddress !== '::1' && ipAddress !== '127.0.0.1') {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`, {
          // ensure no caching for accurate results, or cache heavily for limits
          cache: 'no-store'
        });
        const geoData = await geoResponse.json();
        if (geoData.status === 'success' && geoData.country) {
          country = geoData.country;
        }
      } catch (err) {
        console.error('GeoIP lookup failed:', err);
      }
    }

    await prisma.siteVisit.create({
      data: {
        path: path || '/',
        userAgent,
        ipAddress,
        country,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track visit:', error);
    // Don't fail the client request if tracking fails
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
