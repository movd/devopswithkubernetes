import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import todosRouter from './routes/todos';
import healthyRouter from './routes/healthz';

const app = express();
app.set('trust proxy', 'uniquelocal');

app.use(cors());
// Configure to catch wrong json syntax
app.use(
  express.json({
    verify: (_req, res: express.Response, buf, _encoding) => {
      try {
        JSON.parse(buf.toString());
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    },
  })
);
app.use(morgan('short'));
app.use('/api/static', express.static(`${__dirname}/public`));
app.use('/api/todos', todosRouter);
app.use('/api/healthz', healthyRouter);

export default app;
