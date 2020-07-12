import { Request, Response, Router } from 'express';

import { toNewTodo } from '../typeguards';

const router = Router();

const todos = [
  'add the possibility to create, read, update and delete todos',
  'some testing',
  'user auth',
];

console.log(todos);

router.get('/', (_req, res: Response) => {
  res.status(200).render('todos', {
    title: 'Todos',
    todos,
    imageUrl: 'image.jpg',
  });
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newTodo = toNewTodo(req.body);
    todos.push(newTodo.todo);
    res.redirect('/todos');
  } catch (error) {
    res.redirect('/todos');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('uff');
    }
  }
});

export default router;
