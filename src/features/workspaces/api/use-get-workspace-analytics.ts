import { useQuery } from '@tanstack/react-query';
import { type InferResponseType } from 'hono';

import { client } from '@/lib/rpc';

export type WorkspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspaces)[':workspaceId']['analytics']['$get'],
  200
>;

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}

export const useGetWorkspaceAnalytics = ({
  workspaceId
}: UseGetWorkspaceAnalyticsProps) => {
  const query = useQuery({
    queryKey: ['workspace-analytics', workspaceId],
    queryFn: async () => {
      const res = await client.api.workspaces[':workspaceId']['analytics'].$get(
        {
          param: { workspaceId }
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch workspace analytics');
      }

      const { data } = await res.json();

      return data;
    }
  });

  return query;
};
