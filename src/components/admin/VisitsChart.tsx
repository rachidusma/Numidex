'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VisitData {
  date: string;
  visits: number;
}

export default function VisitsChart({ data }: { data: VisitData[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#013765]">
      <h3 className="text-xl font-bold text-[#013765] mb-6">Website Visits (Last 30 Days)</h3>
      <div className="h-80 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#6b7280' }} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280' }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#FE6B01" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#FE6B01', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
           <div className="h-full w-full flex items-center justify-center text-gray-500">
             No visit data available yet.
           </div>
        )}
      </div>
    </div>
  );
}
