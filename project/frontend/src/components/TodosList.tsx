import React from "react";
import { uuid } from "uuidv4";

import { Todo } from "../types";

export interface TodosListProps {
  todos: Array<Todo>;
}

const TodosList: React.FC<TodosListProps> = ({ todos }) => {
  return (
    <>
      <h3>Todos</h3>
      <ul>
        {todos.map((t) => (
          <li key={uuid()}>{t.done ? <del>{t.task}</del> : t.task}</li>
        ))}
      </ul>
    </>
  );
};

export default TodosList;
