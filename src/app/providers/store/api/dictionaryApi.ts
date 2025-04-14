import { Dictionary } from '~/shared/types';

// Эмулируем данные словаря (обычно они приходят с сервера)
const dictionaryData: Dictionary = {
  assignees: ['Денис Иванов', 'Анна Смирнова', 'Иван Петров', 'Мария Козлова'],
  statuses: [
    { id: 'WAITING', name: 'В ожидании' },
    { id: 'IN_PROGRESS', name: 'В работе' },
    { id: 'DONE', name: 'Готово' },
  ],
  priorities: [
    { id: 'LOW', name: 'Низкий' },
    { id: 'MEDIUM', name: 'Средний' },
    { id: 'HIGH', name: 'Высокий' },
  ],
};

// Функция для получения данных словаря
export const getDictionary = (): Promise<Dictionary> => {
  return new Promise((resolve) => {
    // Имитируем задержку загрузки с сервера
    setTimeout(() => {
      resolve(dictionaryData);
    }, 300);
  });
};
