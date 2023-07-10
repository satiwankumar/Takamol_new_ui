import { TodoList } from '../models/TodoList';

export const todoListMock: TodoList = {
  listType: 'todo',
  items: [
    {
      variant: 'danger',
      buttonsVariant: 'danger',
      content: 'You have 3 employees without work permits.',
      primaryAction: {
        ar: 'تجديد تصاريح العمل',
        en: 'Renew WorkPermits',
      },
      secondaryAction: {
        ar: 'يتعلم أكثر',
        en: 'Learn more',
      },
    },
    {
      variant: 'info_business',
      buttonsVariant: 'business',
      content: 'You have 5 work permits expiring in less than 30 days.',
      primaryAction: {
        ar: 'تجديد تصاريح العمل',
        en: 'Renew WorkPermits',
      },
      secondaryAction: {
        ar: 'يتعلم أكثر',
        en: 'Learn more',
      },
    },
  ],
};
