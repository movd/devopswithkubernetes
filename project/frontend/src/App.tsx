import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Image from "./components/Image";
import TodosList from "./components/TodosList";
import NewTodoForm from "./components/NewTodoForm";

import todosService from "./services/todos";
import { Todo } from "./types";

const baseUrl = "/api";

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
      const addedTask: Todo = await todosService.createTask({
        task: newTask,
      });
      setTodos([...todos, addedTask]);
    } catch (error) {
      console.error("adding task failed");
    }
  };

  const handleTaskUpdate = async (id: number): Promise<void> => {
    const taskToUpdate = todos.find((t) => t.id === id);
    if (taskToUpdate) {
      try {
        const updatedTask = await todosService.updateTask({
          task: taskToUpdate.task,
          id: taskToUpdate.id,
          done: !taskToUpdate.done,
        });
        const idx = todos.findIndex((t) => t.id === updatedTask.id);
        const updatedTodos = [...todos];
        updatedTodos[idx] = updatedTask;
        setTodos(updatedTodos);
      } catch (error) {
        console.error("could not update task");
      }
    }
  };

  const handleTaskDelete = async (id: number): Promise<void> => {
    try {
      await todosService.deleteTask(id);
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos([...newTodos]);
    } catch (error) {
      console.error("deleting task failed");
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
          <Image url={`${baseUrl}/static/image.jpg`} />
          <TodosList
            handleTaskUpdate={handleTaskUpdate}
            todos={todos}
            handleTaskDelete={handleTaskDelete}
          />
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
