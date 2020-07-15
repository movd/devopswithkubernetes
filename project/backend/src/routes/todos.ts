import { Request, Response, Router } from 'express';

import { toNewTodo } from '../typeguards';

const router = Router();

const todos = [
  {
    task: 'add the possibility to create, read, update and delete todos',
    done: false,
  },
  { task: 'some testing', done: false },
  { task: 'user auth', done: false },
];

console.log(todos);

router.get('/', (_req, res: Response) => {
  res.status(200).json({
    todos,
  });
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newTodo = toNewTodo(req.body);
    todos.push(newTodo);
    return res.status(201).json({ newTodo });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    } else {
      console.error(`something went really wrong: ${error as string}`);
      return;
    }
  }
});

export default router;
