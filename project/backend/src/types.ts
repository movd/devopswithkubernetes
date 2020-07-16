export interface Todo {
  task: string;
  done: boolean;
  id: number;
}

export interface TodoListAttributes {
  todos: Array<Todo>;
}
