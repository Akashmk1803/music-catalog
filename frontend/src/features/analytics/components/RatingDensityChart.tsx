'use client';

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RatingAnalytics } from '../types/analytics';

interface RatingDensityChartProps {
  data: RatingAnalytics[];
}

export function RatingDensityChart({ data }: RatingDensityChartProps) {
  // Ensure we have all 5 ratings represented even if 0
  const normalizedData = [1, 2, 3, 4, 5].map(rating => {
    const found = data.find(item => item.rating === rating);
    return {
      label: `${rating}★`,
      count: found ? found.count : 0
    };
  });

  return (
    <div className="w-full h-full flex flex-col min-h-[300px]">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-xl">Rating Density</h3>
      
      <div className="flex-1 w-full relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={normalizedData} 
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1c5b6', fontSize: 12, fontFamily: 'IBM Plex Mono' }} 
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
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
              {normalizedData.map((entry, index) => {
                // Opacity variations based on index (1 to 5 stars -> 0.2 to 1)
                const opacities = [0.2, 0.4, 0.6, 0.8, 1];
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
