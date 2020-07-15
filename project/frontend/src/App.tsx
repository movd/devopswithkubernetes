import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Image from "./components/Image";
import TodosList from "./components/TodosList";
import NewTodoForm from "./components/NewTodoForm";

import todosService from "./services/todos";
import { Todo } from "./types";

const App: React.FC<{}> = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      setTodos(await todosService.fetchAll());
      setIsFetching(false);
    })();
    // eslint-disable-next-line
  }, []);

  const handleNewTodo = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const addedTask: Todo = await todosService.create({
        task: newTask,
        done: false,
      });
      setTodos([...todos, addedTask]);
    } catch (error) {
      console.error("adding task failed");
    }
  };

  return (
    <>
      <Header />
      {isFetching ? (
        <p>
          <em>Fetching Todos...</em>
        </p>
      ) : (
        <>
          <Image url="http://localhost:3001/image.jpg" />
          <TodosList todos={todos} />
          <NewTodoForm
            newTask={newTask}
            handleNewTodo={handleNewTodo}
            handleTitleChange={(e) => setNewTask(e)}
          />
        </>
      )}
    </>
  );
};

export default App;
