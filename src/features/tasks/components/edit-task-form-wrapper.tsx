import { Loader } from 'lucide-react';
import { useMemo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

import { useGetTask } from '../api/use-get-task';
import { EditTaskForm } from './edit-task-form';

interface EditTaskFormWrapperProps {
  id: string;
  onCancel?: () => void;
}

export const EditTaskFormWrapper = ({
  id,
  onCancel
}: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId
  });
  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId: id });

  const projectOptions = useMemo(
    () =>
      projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
      })),
    [projects?.documents]
  );

  const memberOptions = useMemo(
    () =>
      members?.documents.map((member) => ({
        id: member.$id,
        name: member.name
      })),
    [members?.documents]
  );

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <EditTaskForm
      initialValues={task}
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      onCancel={onCancel}
    />
  );
};
