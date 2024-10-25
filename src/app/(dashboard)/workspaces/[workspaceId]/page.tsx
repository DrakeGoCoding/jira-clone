import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';

interface WorkspaceIdPageProps {
  params: { workspaceId: string };
}

export default async function WorkspaceIdPage({
  params
}: WorkspaceIdPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect('/sign-in');
  }

  return <div>WorkspaceIdPage {params.workspaceId}</div>;
}
