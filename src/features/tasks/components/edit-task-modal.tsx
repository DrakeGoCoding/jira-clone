'use client';

import { ResponsiveModal } from '@/components/responsive-modal';

import { useEditTaskModal } from '../hooks/use-edit-task-modal';
import { EditTaskFormWrapper } from './edit-task-form-wrapper';

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  const isOpen = !!taskId;

  return (
    <ResponsiveModal open={isOpen} onOpenChange={close}>
      {isOpen && <EditTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
