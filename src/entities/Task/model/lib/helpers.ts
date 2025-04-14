import { TaskStatus } from '~/shared/types';
import styles from '~/entities/Task/ui/TaskCard.module.css';

export const getStatusClassName = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.WAITING:
      return styles.statusWaiting;
    case TaskStatus.IN_PROGRESS:
      return styles.statusInProgress;
    case TaskStatus.DONE:
      return styles.statusDone;
    default:
      return '';
  }
};
