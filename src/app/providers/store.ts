import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '~/shared/types';
import tasksData from '~/data.json';

// Функция для загрузки задач из localStorage
const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('kanban_tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  } catch (error) {
    console.error('Ошибка при загрузке задач из localStorage:', error);
  }
  return tasksData as Task[]; // Если нет сохраненных задач или произошла ошибка, используем исходные данные
};

// Функция для сохранения задач в localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Ошибка при сохранении задач в localStorage:', error);
  }
};

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const { id, status } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].status = status;
        saveTasksToStorage(state.tasks);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { getDictionary } from './store/api/dictionaryApi';
