export const validateTaskForm = (title: string, assignee: string): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!title.trim()) {
    errors.title = 'Название задачи обязательно';
  }

  if (!assignee.trim()) {
    errors.assignee = 'Исполнитель обязателен';
  }

  return errors;
};

export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0;
};
