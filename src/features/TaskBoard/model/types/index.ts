import { Task, Dictionary } from '~/shared/types';

export interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  initialTask?: Task;
  isEditing?: boolean;
  dictionary: Dictionary;
}
