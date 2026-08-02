'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ReleaseYearAnalytics } from '../types/analytics';

interface ReleaseYearChartProps {
  data: ReleaseYearAnalytics[];
}

export function ReleaseYearChart({ data }: ReleaseYearChartProps) {
  // Sort by year ascending
  const sortedData = [...data].sort((a, b) => a.year - b.year);

  return (
    <div className="w-full h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="font-headline-md text-[20px] text-on-surface">Collection Growth</h3>
          <p className="font-label-caps text-[9px] text-on-surface-variant/60 uppercase tracking-[0.2em] mt-1">Asset distribution by release year</p>
        </div>
      </div>
      
      <div className="flex-1 w-full relative min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={sortedData} 
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e8c086" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e8c086" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1c5b6', fontSize: 12, fontFamily: 'Inter' }} 
              minTickGap={30}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#d1c5b6', fontSize: 12, fontFamily: 'Inter' }} 
            />
            <Tooltip 
              cursor={{ stroke: 'rgba(232, 192, 134, 0.2)', strokeWidth: 2 }}
              contentStyle={{ 
                backgroundColor: 'rgba(24, 28, 26, 0.9)', 
                border: '1px solid rgba(78, 69, 58, 0.2)',
                borderRadius: '8px',
                color: '#e0e3df'
              }}
              itemStyle={{ color: '#e8c086' }}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="#e8c086" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
