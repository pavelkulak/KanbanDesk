import React from 'react';
import { ProgressBarProps } from '~/widgets/KanbanBoard/model/types';
import styles from './ProgressBar.module.css';

export const ProgressBar: React.FC<ProgressBarProps> = ({ completedPercentage }) => {
  const fillWidthPercentage = completedPercentage || 0;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressInfo}>
        <div className={styles.progressText}>{fillWidthPercentage} %</div>
        <div className={styles.progressLabel}>выполненных задач</div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${fillWidthPercentage}%` }} />
      </div>
    </div>
  );
};
