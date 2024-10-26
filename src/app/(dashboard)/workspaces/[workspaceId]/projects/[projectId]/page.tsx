import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getCurrent } from '@/features/auth/queries';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { getProject } from '@/features/projects/queries';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect('/sign-in');
  }

  const project = await getProject({
    projectId: params.projectId
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            image={project.imageUrl}
            name={project.name}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4" /> Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
}
