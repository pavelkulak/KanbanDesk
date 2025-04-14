import { TaskStatus, TaskPriority } from '~/shared/types';

export const DEFAULT_TASK_STATE = {
  title: '',
  assignee: '',
  status: TaskStatus.WAITING,
  priority: TaskPriority.MEDIUM,
};

export const STATUS_OPTIONS = [
  { value: TaskStatus.WAITING, label: 'К выполнению' },
  { value: TaskStatus.IN_PROGRESS, label: 'В процессе' },
  { value: TaskStatus.DONE, label: 'Выполнено' },
];

export const PRIORITY_OPTIONS = [
  { value: TaskPriority.LOW, label: 'Низкий' },
  { value: TaskPriority.MEDIUM, label: 'Средний' },
  { value: TaskPriority.HIGH, label: 'Высокий' },
];
