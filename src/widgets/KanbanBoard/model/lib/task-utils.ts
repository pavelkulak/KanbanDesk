import { Task, TaskStatus } from '~/shared/types';

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter((task) => task.status === status);
};

export const getCompletionPercentage = (tasks: Task[]): number => {
  const totalTasks = tasks.length;
  if (totalTasks === 0) return 0;

  const completedTasks = getTasksByStatus(tasks, TaskStatus.DONE).length;
  return Math.round((completedTasks / totalTasks) * 100);
};
