export interface Todo {
  task: string;
  done: boolean;
  id: number;
}

export type NewTask = Pick<Todo, "task">;
