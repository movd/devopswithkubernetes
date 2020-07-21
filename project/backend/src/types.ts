export interface Task {
  task: string;
  done: boolean;
  id: number;
}

export interface TodoListAttributes {
  todos: Array<Task>;
}
