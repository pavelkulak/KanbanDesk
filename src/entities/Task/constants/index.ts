import { TaskStatus } from '~/shared/types';

export const STATUS_TEXTS = {
  [TaskStatus.WAITING]: 'В ожидании',
  [TaskStatus.IN_PROGRESS]: 'В работе',
  [TaskStatus.DONE]: 'Готово',
} as const;
