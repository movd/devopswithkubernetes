import { Response, Router } from 'express';

const router = Router();

router.get('/', (_req, res: Response) => {
  res.status(200).json({ status: 'ready' });
});

export default router;
