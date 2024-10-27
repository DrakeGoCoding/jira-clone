import { AnalyticsCard } from '@/components/analytics-card';
import { DottedSeparator } from '@/components/dotted-separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { type ProjectAnalyticsResponseType } from '@/features/projects/api/use-get-project-analytics';

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
      <div className="flex w-full flex-row">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDiff > 0 ? 'up' : 'down'}
            diffValue={data.taskDiff}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Assigned tasks"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDiff > 0 ? 'up' : 'down'}
            diffValue={data.assignedTaskDiff}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Complete tasks"
            value={data.completeTaskCount}
            variant={data.completeTaskDiff > 0 ? 'up' : 'down'}
            diffValue={data.completeTaskDiff}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Overdue tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDiff > 0 ? 'up' : 'down'}
            diffValue={data.overdueTaskDiff}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Incomplete tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDiff > 0 ? 'up' : 'down'}
            diffValue={data.incompleteTaskDiff}
          />
          <DottedSeparator direction="vertical" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
