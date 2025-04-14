import React, { useState, useEffect } from 'react';
import { TaskFormProps } from '~/features/TaskBoard/model/types';
import styles from './TaskForm.module.css';
import {
  DEFAULT_TASK_STATE,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
} from '~/features/TaskBoard/constants';
import { validateTaskForm, isFormValid } from '~/features/TaskBoard/model/lib/form-validation';

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialTask,
  isEditing = false,
  dictionary,
}) => {
  const [formState, setFormState] = useState(DEFAULT_TASK_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialTask) {
      setFormState({
        title: initialTask.title,
        assignee: initialTask.assignee,
        status: initialTask.status,
        priority: initialTask.priority,
      });
    }
  }, [initialTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateTaskForm(formState.title, formState.assignee);
    setErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      onSubmit(formState);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          {isEditing ? 'Редактировать задачу' : 'Создать задачу'}
        </h2>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='title'>
          Название
        </label>
        <input
          id='title'
          name='title'
          type='text'
          className={styles.input}
          value={formState.title}
          onChange={handleChange}
          placeholder='Введите название задачи'
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='assignee'>
          Исполнитель
        </label>
        <select
          id='assignee'
          name='assignee'
          className={styles.select}
          value={formState.assignee}
          onChange={handleChange}
        >
          <option value=''>Выберите исполнителя</option>
          {dictionary.assignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
        {errors.assignee && <span className={styles.error}>{errors.assignee}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='status'>
          Статус
        </label>
        <select
          id='status'
          name='status'
          className={styles.select}
          value={formState.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='priority'>
          Приоритет
        </label>
        <select
          id='priority'
          name='priority'
          className={styles.select}
          value={formState.priority}
          onChange={handleChange}
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.buttons}>
        <button
          type='button'
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onCancel}
        >
          Отмена
        </button>
        <button type='submit' className={`${styles.button} ${styles.submitButton}`}>
          {isEditing ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};
