import axios from "axios";

import { NewTask, Todo } from "../types";

const baseUrl = "/api/todos";

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
