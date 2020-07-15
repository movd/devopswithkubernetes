import React from "react";

export interface NewTodoFormProps {
  newTask: string;
  handleNewTodo(event: React.FormEvent<HTMLFormElement>): Promise<void>;
  handleTitleChange(title: string): void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  newTask,
  handleNewTodo,
  handleTitleChange,
}) => {
  return (
    <>
      <h3>Create a new Todo</h3>
      <form onSubmit={handleNewTodo}>
        <p>
          <input
            type="text"
            placeholder="new todo"
            value={newTask}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              handleTitleChange(e.target.value)
            }
          />
        </p>
        <button type="submit">create!</button>
      </form>
    </>
  );
};

export default NewTodoForm;
