import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';
import { getProject } from '@/features/projects/queries';

interface ProjectIdSettingsPageProps {
  params: {
    workspaceId: string;
    projectId: string;
  };
}

export default async function ProjectIdSettingsPage({
  params
}: ProjectIdSettingsPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect('/sign-in');
  }

  const project = await getProject({
    projectId: params.projectId
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
