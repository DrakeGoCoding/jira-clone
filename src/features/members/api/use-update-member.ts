import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api.members)[':memberId']['$patch']
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[':memberId']['$patch']
>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await client.api.members[':memberId'].$patch({
        json,
        param
      });

      if (!res.ok) {
        throw new Error('Failed to update member');
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success('Member updated');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
    onError: () => {
      toast.error('Failed to update member');
    }
  });

  return mutation;
};
