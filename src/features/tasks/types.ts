import { Models } from 'node-appwrite';

export enum TaskStatus {
  TODO = 'TODO',
  BACKLOG = 'BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE'
}

export type Task = Models.Document & {
  name: string;
  description: string;
  status: TaskStatus;
  assigneeId: string;
  dueDate: string;
  projectId: string;
};
