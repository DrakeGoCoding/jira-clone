import { useQuery } from '@tanstack/react-query';
import { type InferResponseType } from 'hono';

import { client } from '@/lib/rpc';

export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[':projectId']['analytics']['$get'],
  200
>;

interface UseGetProjectAnalyticsProps {
  projectId: string;
}

export const useGetProjectAnalytics = ({
  projectId
}: UseGetProjectAnalyticsProps) => {
  const query = useQuery({
    queryKey: ['project-analytics', projectId],
    queryFn: async () => {
      const res = await client.api.projects[':projectId']['analytics'].$get({
        param: { projectId }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch project analytics');
      }

      const { data } = await res.json();

      return data;
    }
  });

  return query;
};
