import axios from "axios";

import { Todo } from "../types";
const baseUrl = "http://localhost:8081/todos";

const fetchAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data.todos;
};

const create = async (obj: Todo) => {
  const res = await axios.post(baseUrl, obj);
  return res.data.newTodo;
};

export default { fetchAll, create };
