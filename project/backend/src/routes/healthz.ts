import { Response, Router } from 'express';
import { Task } from '../models';

const router = Router();

const resolveInThreeSeconds = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(3), 3000);
  });
};

router.get('/', async (_req, res: Response) => {
  try {
    // Connect to db and if promise does not resolve return 400
    const asyncFunctions = [resolveInThreeSeconds(), Task.findAll()];
    const results = await Promise.race(asyncFunctions);

    if (results === 3) {
      return res
        .status(400)
        .json({ status: 'could not connect to db in less than 3 seconds' });
    }

    return res.status(200).json({ status: 'connected' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      throw error;
    }
  }
});

export default router;
