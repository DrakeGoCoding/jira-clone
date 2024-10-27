import { cn } from '@/lib/utils';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: 'up' | 'down';
  diffValue: number;
}

export const AnalyticsCard = ({
  title,
  value,
  variant,
  diffValue
}: AnalyticsCardProps) => {
  const iconColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
  const diffValueColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
  const Icon = variant === 'up' ? FaCaretUp : FaCaretDown;

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 overflow-hidden font-medium">
            <span className="truncate text-base">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn(iconColor, 'size-4')} />
            <span
              className={cn(diffValueColor, 'truncate text-base font-medium')}
            >
              {diffValue}
            </span>
          </div>
        </div>
        <CardTitle className="3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};