'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GenreAnalytics } from '../types/analytics';

interface GenreDistributionChartProps {
  data: GenreAnalytics[];
}

export function GenreDistributionChart({ data }: GenreDistributionChartProps) {
  // Sort by count descending and take top 5
  const topGenres = [...data].sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col min-h-[300px]">
      <div className="flex justify-between items-end mb-xl">
        <h3 className="font-headline-md text-headline-md text-on-surface">Genre Distribution</h3>
        <span className="font-data-md text-data-md text-primary">Top 5 Segments</span>
      </div>
      
      <div className="flex-1 w-full relative min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={topGenres} 
            layout="vertical"
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              dataKey="genre" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1c5b6', fontSize: 12, fontFamily: 'Inter' }}
              width={120}
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
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {topGenres.map((entry, index) => {
                // Opacity variations based on index
                const opacities = [1, 0.8, 0.6, 0.4, 0.2];
                const opacity = opacities[index] || 0.2;
                return <Cell key={`cell-${index}`} fill={`rgba(232, 192, 134, ${opacity})`} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
