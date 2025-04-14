import React from 'react';
import { Column } from '../Column/Column';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './KanbanBoard.module.css';
import { TaskStatus } from '~/shared/types';
import { useBoardState } from '~/widgets/KanbanBoard/model/lib/useBoardState';
import { TaskForm } from '~/features/TaskBoard';
import { useTasks } from '~/shared/lib/hooks/useTasks';
import { getTasksByStatus, getCompletionPercentage } from '../../model/lib/task-utils';
import { useDictionary } from '~/shared/lib/hooks/useDictionary';
import { Modal } from '~/shared/ui/Modal';
import { LoadingState } from '~/shared/ui/LoadingState/LoadingState';

export const KanbanBoard: React.FC = () => {
  const { tasks } = useTasks();
  const {
    isFormOpen,
    editingTask,
    handleDragStart,
    handleDrop,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSubmitForm,
    handleCloseForm,
  } = useBoardState();

  const { dictionary, isLoading, error } = useDictionary();
  const completionPercentage = getCompletionPercentage(tasks);

  return (
    <LoadingState isLoading={isLoading} error={error}>
      <div className={styles.boardContainer}>
        <div className={styles.columnsContainer}>
          {[TaskStatus.WAITING, TaskStatus.IN_PROGRESS, TaskStatus.DONE].map((status) => (
            <Column
              key={status}
              status={status}
              tasks={getTasksByStatus(tasks, status)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onTaskDragStart={handleDragStart}
              onTaskDrop={handleDrop}
            />
          ))}
        </div>

        <ProgressBar completedPercentage={completionPercentage} />
      </div>

      {isFormOpen && (
        <Modal onClose={handleCloseForm}>
          <TaskForm
            onSubmit={handleSubmitForm}
            onCancel={handleCloseForm}
            initialTask={editingTask || undefined}
            isEditing={!!editingTask}
            dictionary={dictionary}
          />
        </Modal>
      )}
    </LoadingState>
  );
};
