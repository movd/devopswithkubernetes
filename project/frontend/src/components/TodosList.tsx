import React from "react";

import { Todo } from "../types";

export interface TodosListProps {
  todos: Array<Todo>;
  handleTaskUpdate(id: number): Promise<void>;
  handleTaskDelete(id: number): Promise<void>;
}

const TodosList: React.FC<TodosListProps> = ({
  todos,
  handleTaskUpdate,
  handleTaskDelete,
}) => {
  return (
    <>
      <h3>Todos</h3>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span onClick={() => handleTaskUpdate(t.id)}>
              {t.done ? <del>{t.task}</del> : t.task}
            </span>{" "}
            <span
              role="img"
              aria-label="Cross Mark"
              onClick={() => handleTaskDelete(t.id)}
            >
              ❌
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodosList;
