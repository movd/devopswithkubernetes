import { Request, Response, Router } from 'express';
import os from 'os';

import { NATS_URL } from '../setup';
import { Task } from '../models';
import { toNewTask } from '../typeguards';
import { sendTaskToNATS } from '../services/nats';

const router = Router();

router.get('/', async (_req, res: Response) => {
  try {
    res
      .status(200)
      .json({ todos: await Task.findAll(), hostname: os.hostname() });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      throw error;
    }
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const addedTask = await Task.create(toNewTask(req.body));
    if (NATS_URL) await sendTaskToNATS('created', addedTask);
    return res.status(201).json({ newTodo: addedTask });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.name === 'SequelizeDatabaseError' &&
        error.message.includes('value too long for type character')
      ) {
        console.error(
          `todos ERROR: ${error.message} - '${toNewTask(req.body).task}'`
        );
      } else {
        console.error(`todos ERROR: ${error.message}`);
      }

      return res.status(400).json({ error: error.message });
    } else {
      console.error(`something went really wrong: ${error as string}`);
      return;
    }
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    return res.status(200).json(await Task.findByPk(id));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`todos ERROR: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      console.error(`something went really wrong: ${error as string}`);
      return;
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const taskToDelete = await Task.findByPk(id);
    const deletedRows = await Task.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({});
    }
    if (NATS_URL) await sendTaskToNATS('deleted', taskToDelete);
    return res.status(204).json({});
  } catch (error) {
    if (error instanceof Error) {
      console.error(`todos ERROR: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      console.error(`something went really wrong: ${error as string}`);
      return;
    }
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // only proceed if task if found by id
    if (await Task.findByPk(id)) {
      const taskToUpdate = toNewTask(req.body);
      // Set returning so that elem[1] of return array includes updated tuplets/values
      // Desctructure elem[1] = Model
      const [, updatedTuplets] = await Task.update(
        { task: taskToUpdate.task, done: taskToUpdate.done },
        { where: { id }, returning: true }
      );

      // Desctructure further to just get updated Task
      const [updatedTask] = updatedTuplets;
      if (NATS_URL) await sendTaskToNATS('updated', updatedTask);

      return res.status(200).json(updatedTask);
    } else {
      return res.status(404).json();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`todos ERROR: ${error.message}`);
      return res.status(400).json({ error: error.message });
    } else {
      console.error(`something went really wrong: ${error as string}`);
      return;
    }
  }
});

export default router;
