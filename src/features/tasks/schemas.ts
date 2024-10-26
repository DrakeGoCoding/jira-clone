import { z } from 'zod';

import { TaskStatus } from './types';

export const getTasksSchema = z.object({
  workspaceId: z.string(),
  projectId: z.string().nullish(),
  assigneeId: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).nullish(),
  dueDate: z.string().nullish(),
  search: z.string().nullish()
});

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  status: z.nativeEnum(TaskStatus, { required_error: 'Required' }),
  workspaceId: z.string().min(1, 'Required'),
  projectId: z.string().min(1, 'Required'),
  dueDate: z.coerce.date(),
  assigneeId: z.string().min(1, 'Required'),
  description: z.string().optional()
});

export const updateBulkSchema = z.object({
  tasks: z.array(
    z.object({
      $id: z.string(),
      status: z.nativeEnum(TaskStatus),
      position: z.number().int().positive().min(1000).max(1_000_000)
    })
  )
});
