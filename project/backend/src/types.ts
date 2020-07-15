export interface Todo {
  task: string;
  done: boolean;
}

export interface TodoListAttributes {
  todos: Array<Todo>;
}
