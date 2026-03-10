'use client';

interface CountryData {
  country: string;
  visits: number;
}

export default function CountriesList({ data }: { data: CountryData[] }) {
  // Sort descending by visits
  const sortedData = [...data].sort((a, b) => b.visits - a.visits);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#FE6B01]">
      <h3 className="text-xl font-bold text-[#013765] mb-6">Visits by Country</h3>
      
      {sortedData.length > 0 ? (
        <ul className="space-y-4">
          {sortedData.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {/* Basic fallback if we just have string names. We can add flags later if desired. */}
                  📍
                </span>
                <span className="font-medium text-gray-700">{item.country || 'Unknown'}</span>
              </div>
              <span className="font-bold text-[#FE6B01] bg-orange-50 px-3 py-1 rounded-full text-sm">
                {item.visits} {item.visits === 1 ? 'visit' : 'visits'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-40 flex items-center justify-center text-gray-500">
          No country data available yet.
        </div>
      )}
    </div>
  );
}
