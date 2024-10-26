import { ChevronRight, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { type Project } from '@/features/projects/types';
import { useConfirm } from '@/hooks/use-confirm';

import { useDeleteTask } from '../api/use-delete-task';
import { type Task } from '../types';

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

export const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter();

  const { mutate, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete task',
    'This action cannot be undone. Are you sure you want to delete this task?',
    'destructive'
  );

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${project.workspaceId}/tasks`);
        }
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />
      <Link href={`/workspaces/${project.workspaceId}/projects/${project.$id}`}>
        <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>
      <ChevronRight className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>
      <Button
        className="ml-auto"
        variant="destructive"
        size="sm"
        onClick={onDelete}
        disabled={isPending}
      >
        <TrashIcon className="size-4" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
      <ConfirmDialog />
    </div>
  );
};
