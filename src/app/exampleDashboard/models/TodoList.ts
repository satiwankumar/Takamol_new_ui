import { TodoListTypes } from './TodoListTypes';
import { TodoMessage } from './TodoMessages';

export interface TodoList {
  listType: TodoListTypes;
  items: TodoMessage[];
}
