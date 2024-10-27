import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type InferRequestType, type InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[':taskId']['$delete'],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.tasks)[':taskId']['$delete']
>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.tasks[':taskId'].$delete({
        param
      });

      if (!res.ok) {
        throw new Error('Failed to delete task');
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Task deleted');
      queryClient.invalidateQueries({
        queryKey: ['project-analytics', data.projectId]
      });
      queryClient.invalidateQueries({
        queryKey: ['workspace-analytics', data.workspaceId]
      });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.$id] });
    },
    onError: () => {
      toast.error('Failed to delete task');
    }
  });

  return mutation;
};
