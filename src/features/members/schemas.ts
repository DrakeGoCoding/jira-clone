import { z } from 'zod';
import { MemberRole } from './types';

export const getMembersSchema = z.object({
  workspaceId: z.string()
});

export const updateMemberSchema = z.object({
  role: z.nativeEnum(MemberRole)
});
