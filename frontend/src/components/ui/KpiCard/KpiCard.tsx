import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../Card';

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

export function KpiCard({ title, value, icon: Icon, trend, className, ...props }: KpiCardProps) {
  return (
    <Card 
      className={cn("flex flex-col justify-between gap-6 hover:bg-surface-container-high/40 hover:-translate-y-1 hover:shadow-xl", className)} 
      {...props}
    >
      <CardContent className="p-8 h-full flex flex-col justify-between gap-6">
        <div className="flex justify-between items-start">
          {Icon && <Icon className="text-primary/60" size={24} strokeWidth={1.5} />}
          {trend && (
            <span className={cn(
              "font-label-caps text-[9px] tracking-[0.2em] px-2 py-1 rounded-full",
              {
                "bg-success/10 text-success": trend.direction === 'up',
                "bg-error/10 text-error": trend.direction === 'down',
                "bg-surface-container-highest text-on-surface-variant": trend.direction === 'neutral',
              }
            )}>
              {trend.value}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-label-caps text-[10px] text-on-surface-variant/70 uppercase tracking-[0.2em] mb-2">{title}</h4>
          <div className="font-display-lg text-[40px] leading-none text-on-surface tracking-tight truncate">
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
