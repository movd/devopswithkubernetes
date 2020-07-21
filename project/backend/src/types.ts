import { Task } from './models';

export interface Task {
  task: string;
  done: boolean;
  id: string; // Todo: better use uuid
}

export interface TodoListAttributes {
  todos: Array<Task>;
}

export type NewTask = Omit<Task, 'id'>;
