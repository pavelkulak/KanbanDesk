import { Task, TaskStatus } from '~/shared/types';

export interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onTaskDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
  onTaskDrop: (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => void;
}

export interface ProgressBarProps {
  completedPercentage: number;
}
