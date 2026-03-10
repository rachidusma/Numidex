'use client';

import { useState, useEffect } from 'react';
import VisitsChart from './VisitsChart';
import CountriesList from './CountriesList';

type FilterType = 'daily' | 'weekly' | 'monthly';

export default function AnalyticsDashboard() {
  const [filter, setFilter] = useState<FilterType>('daily');
  const [chartData, setChartData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?filter=${filter}`);
        const data = await res.json();
        if (data.success) {
          setChartData(data.chartData || []);
          setCountriesData(data.countriesData || []);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="mb-8">
      {/* Filter Controls */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-inner">
          <button
            onClick={() => setFilter('daily')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'daily'
                ? 'bg-white text-[#013765] shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setFilter('weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'weekly'
                ? 'bg-white text-[#013765] shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setFilter('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'monthly'
                ? 'bg-white text-[#013765] shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE6B01]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <VisitsChart data={chartData} />
          </div>
          
          {/* Countries List */}
          <div>
            <CountriesList data={countriesData} />
          </div>
        </div>
      )}
    </div>
  );
}
