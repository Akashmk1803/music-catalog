'use client';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StatusAnalytics } from '../types/analytics';

interface StatusDistributionChartProps {
  data: StatusAnalytics[];
}

export function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  // Ensure we have all 3 main statuses
  const expectedStatuses = ['Completed', 'Listening', 'Planned'];
  const normalizedData = expectedStatuses.map(status => {
    const found = data.find(item => item.status === status);
    return {
      status,
      count: found ? found.count : 0
    };
  });

  return (
    <div className="w-full h-full flex flex-col min-h-[300px]">
      <h3 className="font-headline-md text-[20px] text-on-surface mb-6">Status Distribution</h3>
      
      <div className="flex-1 w-full relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={normalizedData} 
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis 
              dataKey="status" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1c5b6', fontSize: 12, fontFamily: 'Inter' }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(232, 192, 134, 0.05)' }}
              contentStyle={{ 
                backgroundColor: 'rgba(24, 28, 26, 0.9)', 
                border: '1px solid rgba(78, 69, 58, 0.2)',
                borderRadius: '8px',
                color: '#e0e3df'
              }}
              itemStyle={{ color: '#e8c086' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={50}>
              {normalizedData.map((entry, index) => {
                const opacities = [1, 0.6, 0.3]; // Completed, Listening, Planned
                const opacity = opacities[index] || 1;
                return <Cell key={`cell-${index}`} fill={`rgba(232, 192, 134, ${opacity})`} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
