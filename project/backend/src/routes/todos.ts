import { Request, Response, Router } from 'express';

import { toNewTask, toSingleTask } from '../typeguards';

const router = Router();

let todos = [
  {
    task: 'add create',
    done: true,
    id: 1,
  },
  {
    task: 'add read',
    done: true,
    id: 2,
  },
  {
    task: 'add update',
    done: false,
    id: 3,
  },
  {
    task: 'add delete',
    done: false,
    id: 4,
  },
  { task: 'some testing', done: false, id: 5 },
  { task: 'user auth', done: false, id: 6 },
];

console.log(todos);

router.get('/', (_req, res: Response) => {
  res.status(200).json({
    todos,
  });
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newTodo = toNewTask({
      ...req.body,
      id: Math.floor(Math.random() * 1000),
    });
    todos = [...todos, newTodo];
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

router.get('/:id', (req: Request, res: Response) => {
  try {
    const requestedTask = toSingleTask(req.params);
    console.log('task to show: ', requestedTask.id);

    const singleTask = todos.find((t) => t.id === requestedTask.id);
    if (!singleTask) {
      return res
        .status(404)
        .json({ message: `No task found with id ${requestedTask.id}` });
    }

    return res.status(200).json(singleTask);
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

router.delete('/:id', (req: Request, res: Response) => {
  try {
    const requestedTask = toSingleTask(req.params);

    const singleTask = todos.find((t) => t.id === requestedTask.id);
    if (!singleTask) {
      return res
        .status(404)
        .json({ message: `No task found with id ${requestedTask.id}` });
    }

    console.log('deleted:', singleTask);
    const newTodos = todos.filter((t) => t.id !== requestedTask.id);
    todos = [...newTodos];

    return res.status(204).json({});
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

router.put('/:id', (req: Request, res: Response) => {
  try {
    // Check typeguard
    const requestedTask = toSingleTask(req.params);
    // Check if task exists
    const singleTask = todos.find((t) => t.id === requestedTask.id);
    if (!singleTask) {
      return res
        .status(404)
        .json({ message: `No task found with id ${requestedTask.id}` });
    }

    // Overwrite in payload with param and typecheck
    const taskToUpdate = toNewTask({ ...req.body, id: requestedTask.id });
    const idx = todos.findIndex((t) => t.id === taskToUpdate.id);
    todos[idx] = taskToUpdate;

    console.log('updated:', taskToUpdate);
    return res.status(200).json({ ...taskToUpdate });
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
