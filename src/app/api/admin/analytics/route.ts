import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'daily';

    const now = new Date();
    let startDate = new Date();
    
    // Determine the start date for the query
    if (filter === 'weekly') {
      // Last 12 weeks
      startDate.setDate(now.getDate() - (12 * 7));
    } else if (filter === 'monthly') {
      // Last 12 months
      startDate.setMonth(now.getMonth() - 11); // current + 11 past = 12
      startDate.setDate(1); // Start at the beginning of that month
    } else {
      // Daily: Last 30 days
      startDate.setDate(now.getDate() - 30);
    }

    // 1. Fetch visits within range
    const rawVisits = await prisma.siteVisit.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      select: {
        date: true,
      },
      orderBy: {
        date: 'asc',
      }
    });

    // 2. Group the data based on filter type
    const visitsMap = new Map<string, number>();

    rawVisits.forEach((visit) => {
      let key = '';
      const d = visit.date;
      
      if (filter === 'weekly') {
        // Group by ISO week (approximate by finding nearest Monday)
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const startOfWeek = new Date(d.setDate(diff));
        key = startOfWeek.toISOString().split('T')[0]; // Format: YYYY-MM-DD of Monday
      } else if (filter === 'monthly') {
        // Group by YYYY-MM
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        key = `${year}-${month}`;
      } else {
        // Daily
        key = d.toISOString().split('T')[0];
      }

      visitsMap.set(key, (visitsMap.get(key) || 0) + 1);
    });

    // We do not want missing days/weeks to look weird (gap in the graph),
    // but recharts connects dots anyway. For simplicity, we just return the map entries.
    const chartData = Array.from(visitsMap.entries())
      .map(([dateKey, visits]) => ({
        date: dateKey,
        visits,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));


    // 3. Fetch Top Countries within same range
    const rawCountries = await prisma.siteVisit.groupBy({
      by: ['country'],
      _count: {
        _all: true,
      },
      where: {
        date: {
          gte: startDate,
        },
        country: {
          not: null,
        },
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const countriesData = rawCountries
      .filter(v => v.country && v.country !== 'Unknown')
      .map(v => ({
        country: v.country as string,
        visits: v._count._all,
      }));

    return NextResponse.json({
      success: true,
      chartData,
      countriesData,
    });

  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
