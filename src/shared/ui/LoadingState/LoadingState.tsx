import React from 'react';
import styles from './LoadingState.module.css';

interface LoadingStateProps {
  isLoading?: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ isLoading, error, children }) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <span>Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return <>{children}</>;
};
