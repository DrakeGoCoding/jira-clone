import { cn } from '@/lib/utils';
import { differenceInDays, format as formatDate } from 'date-fns';

interface TaskDateProps {
  value: string;
  className?: string;
  format?: string;
}

export const TaskDate = ({
  value,
  className,
  format = 'PPP'
}: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  let textColor = 'text-muted-foreground';
  if (diffInDays <= 3) {
    textColor = 'text-red-500';
  } else if (diffInDays <= 7) {
    textColor = 'text-orange-500';
  } else if (diffInDays <= 14) {
    textColor = 'text-yellow-500';
  }

  return (
    <div className={cn('inline-flex items-center', textColor)}>
      <span className={cn('truncate', className)}>
        {formatDate(value, format)}
      </span>
    </div>
  );
};
