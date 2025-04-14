import { Task, TaskStatus } from '~/shared/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addTask, updateTask, deleteTask, moveTask } from '~/app/providers/store';
import { useCallback } from 'react';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const handleAddTask = useCallback(
    (task: Omit<Task, 'id'>) => {
      dispatch(
        addTask({
          ...task,
          id: `task${Date.now()}`,
        })
      );
    },
    [dispatch]
  );

  const handleUpdateTask = useCallback(
    (task: Task) => {
      dispatch(updateTask(task));
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleMoveTask = useCallback(
    (id: string, status: TaskStatus) => {
      dispatch(moveTask({ id, status }));
    },
    [dispatch]
  );

  return {
    tasks,
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    moveTask: handleMoveTask,
  };
};
