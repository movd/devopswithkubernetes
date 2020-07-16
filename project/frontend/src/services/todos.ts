import axios from "axios";

import { NewTask, Todo } from "../types";

let baseUrl = "http://localhost:8081/api/todos";
if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3000/api/todos";
}

const fetchAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data.todos;
};

const createTask = async (obj: NewTask) => {
  const res = await axios.post(baseUrl, obj);
  return res.data.newTodo;
};

const deleteTask = async (id: number) => {
  await axios.delete(`${baseUrl}/${id}`);
};

const updateTask = async (obj: Todo | undefined) => {
  if (!obj) {
    return;
  }
  const res = await axios.put(`${baseUrl}/${obj.id}`, obj);
  return res.data;
};

export default { fetchAll, createTask, deleteTask, updateTask };
