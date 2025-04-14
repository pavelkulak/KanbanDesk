import React from 'react';
import { TaskStatus } from '~/shared/types';
import { Trash2, Zap, FileText, CheckCheck, User } from 'lucide-react';
import { STATUS_TEXTS } from '~/entities/Task/constants';
import { getStatusClassName } from '~/entities/Task/model/lib/helpers';
import { TaskCardProps } from '~/entities/Task/model/types';
import styles from './TaskCard.module.css';

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onDragStart }) => {
  const isTitleSecondary = !task.assignee && task.title === 'Новая задача';

  return (
    <div
      className={styles.taskCard}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onClick={() => onEdit(task)}
    >
      <div className={styles.mainRow}>
        <div className={styles.titleWrapper}>
          <div className={styles.circleIcon}>
            <CheckCheck size={16} color='#ffffff' />
          </div>
          <h3 className={`${styles.title} ${isTitleSecondary ? styles.titleSecondary : ''}`}>
            {task.title}
          </h3>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            title='Удалить задачу'
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {task.assignee ? (
        <div className={styles.assigneeRow}>
          <div className={styles.assigneeWrapper}>
            <div className={styles.assigneeCircle}>{task.assignee.charAt(0).toUpperCase()}</div>
            <div className={styles.assigneeName}>{task.assignee}</div>
          </div>
        </div>
      ) : (
        task.title === 'Новая задача' && (
          <div className={styles.assigneeRow}>
            <button className={styles.addAssigneeButton}>
              <User size={16} />
              Добавить ответственного
            </button>
          </div>
        )
      )}

      <div className={styles.statusRow}>
        <div className={`${styles.status} ${getStatusClassName(task.status)}`}>
          {task.status === TaskStatus.WAITING ? <Zap size={16} /> : <FileText size={16} />}
          {STATUS_TEXTS[task.status]}
        </div>
      </div>
    </div>
  );
};
