import { useState, useCallback } from 'react';
import { Task, TaskStatus } from '~/shared/types';
import { useTasks } from '~/shared/lib/hooks/useTasks';

export const useBoardState = () => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.WAITING);
  const { addTask, updateTask, deleteTask, moveTask } = useTasks();

  const handleDragStart = useCallback((_: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
      e.preventDefault();
      if (draggedTask && draggedTask.status !== status) {
        moveTask(draggedTask.id, status);
      }
      setDraggedTask(null);
    },
    [draggedTask, moveTask]
  );

  const handleAddTask = useCallback((status: TaskStatus) => {
    setNewTaskStatus(status);
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const handleDeleteTask = useCallback(
    (id: string) => {
      deleteTask(id);
    },
    [deleteTask]
  );

  const handleSubmitForm = useCallback(
    (taskData: Omit<Task, 'id'>) => {
      if (editingTask) {
        updateTask({ ...taskData, id: editingTask.id });
      } else {
        addTask({ ...taskData, status: newTaskStatus });
      }
      setIsFormOpen(false);
      setEditingTask(null);
    },
    [editingTask, newTaskStatus, updateTask, addTask]
  );

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  return {
    draggedTask,
    isFormOpen,
    editingTask,
    handleDragStart,
    handleDrop,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSubmitForm,
    handleCloseForm,
  };
};
