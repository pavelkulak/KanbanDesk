import { TaskStatus } from '~/shared/types';

export const COLUMN_STYLES = {
  [TaskStatus.WAITING]: 'columnWaiting',
  [TaskStatus.IN_PROGRESS]: 'columnInProgress',
  [TaskStatus.DONE]: 'columnDone',
};

export const COLUMN_TITLES = {
  [TaskStatus.WAITING]: 'В ожидании',
  [TaskStatus.IN_PROGRESS]: 'В работе',
  [TaskStatus.DONE]: 'Готово',
};
