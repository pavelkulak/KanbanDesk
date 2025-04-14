import React from 'react';
import type { ColumnProps } from '~/widgets/KanbanBoard/model/types';
import { TaskCard } from '~/entities/Task';
import styles from './Column.module.css';
import { TaskStatus } from '~/shared/types';
import { Plus, Zap, FileText } from 'lucide-react';
import { COLUMN_STYLES, COLUMN_TITLES } from '~/widgets/KanbanBoard/constants';

export const Column: React.FC<ColumnProps> = ({
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onTaskDragStart,
  onTaskDrop,
}) => {
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.WAITING:
        return <Zap size={16} className={styles.titleIconWaiting} />;
      case TaskStatus.IN_PROGRESS:
        return <FileText size={16} className={styles.titleIconInProgress} />;
      case TaskStatus.DONE:
        return <FileText size={16} className={styles.titleIconDone} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.columnWithHeader}>
      <div className={styles.columnHeader}>
        <div className={styles.headerWrapper}>
          <div className={`${styles.columnTitle} ${styles[`columnTitle${status}`]}`}>
            {getStatusIcon(status)}
            {COLUMN_TITLES[status]}
          </div>
          <div className={styles.taskCount}>{tasks.length}</div>
        </div>
      </div>

      <div
        className={`${styles.column} ${styles[COLUMN_STYLES[status]]}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onTaskDrop(e, status)}
      >
        <div className={styles.tasksButtonContainer}>
          <div className={styles.columnContent}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onDragStart={onTaskDragStart}
              />
            ))}
          </div>
        </div>
        <button
          className={`${styles.addTaskButton} ${styles[`addTaskButton${status}`]}`}
          onClick={() => onAddTask(status)}
        >
          <Plus size={16} />
          Новая задача
        </button>
      </div>
    </div>
  );
};
